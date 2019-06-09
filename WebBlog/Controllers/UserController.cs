using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebBlog.DAL.Entities;
using WebBlog.Domain.Interfaces;
using WebBlog.Domain.Models;

namespace WebBlog.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        
        readonly IUserService _userService;
        readonly EFContext _context;

        public UserController(UserManager<DbUser> userManager,
                IUserService userService, EFContext context)
        {
            _userManager = userManager;
            
            _userService = userService;
            _context = context;
        }

        //GET: api/User
       [HttpGet("list")]
        public  IEnumerable<ApplicationUserListViewModel> Get()
        {

            var model = _context
                .Users
                .Include(c => c.Profile)
                .Include(c => c.UserImage)
                .OrderBy(c => c.Email)
                .Select(u => new ApplicationUserListViewModel
                {
                    Id = u.Id,
                    Email = u.Email,
                    Roles = u.UserRoles.Select(r => new RoleItemViewModel
                    {
                        Id = r.Role.Id,
                        Name = r.Role.Name
                    }),
                    FullName = u.Profile.FirstName + ' ' + u.Profile.MiddleName + ' ' + u.Profile.LastName,
                    UserImage = _userService.GetPathImage(u.UserImage.Path)
                    
        })
                .ToList();

            return model;
        }

      
        // GET: api/User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute]string id)
        {
            if (ModelState.IsValid)
            {
                if (id == null)
                {
                    return BadRequest(new { invalid = "User is not found" });

                }

                var user = await _userManager.FindByIdAsync(id);
                var rolesForUser = await _userManager.GetRolesAsync(user);
                var logins = await _userManager.GetLoginsAsync(user);
                

                using (var transaction = _context.Database.BeginTransaction())
                {
                    IdentityResult result = IdentityResult.Success;
                    foreach (var login in logins)
                    {
                        result = await _userManager.RemoveLoginAsync(user, login.LoginProvider, login.ProviderKey);
                        if (result != IdentityResult.Success)
                            break;
                    }
                    if (result == IdentityResult.Success)
                    {
                        foreach (var item in rolesForUser)
                        {
                            result = await _userManager.RemoveFromRoleAsync(user, item);
                            if (result != IdentityResult.Success)
                                break;
                        }
                    }
                    if (result == IdentityResult.Success)
                    {
                        result = await _userManager.DeleteAsync(user);
                        if (result == IdentityResult.Success)
                            transaction.Commit(); 
                        //only commit if user and all his logins/roles have been deleted  
                    }

                }
                return Ok(user.Id); 
            }

        return Ok();
            
 }
        [HttpPost("user")]
        [Authorize]
        public async Task<IActionResult> Get([FromBody]UserProfileGetModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return BadRequest(new { invalid = "User with this email was not found" });
            }

            var profile = _userService.GetUserProfile(model.Id);

            return Ok(profile);
        }
    }
}