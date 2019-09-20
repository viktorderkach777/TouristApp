using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TouristApp.Helpers;
using TouristApp.ViewModels;
using Microsoft.AspNetCore.Identity;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using Google.Apis.Auth;

namespace TouristApp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class GoogleAuthController : Controller
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;    
        readonly IFileService _fileService;
        readonly IJWTTokenService _jWTTokenService;        

        public GoogleAuthController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,
            IJWTTokenService jWTTokenService)           
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;                           
            _roleManager = roleManager;
            _jWTTokenService = jWTTokenService;           
        }

        // POST api/googleauth/google
        [HttpPost]
        public async Task<IActionResult> Google([FromBody]GoogleAuthViewModel model)
        {
            var userInfo = GoogleJsonWebSignature.ValidateAsync(model.TokenId, new GoogleJsonWebSignature.ValidationSettings()).Result;
            
            var user = await _userManager.FindByEmailAsync(userInfo.Email);           

            if (user == null)
            {
                string path = _fileService.UploadFacebookImage(userInfo.Picture);

                user = new DbUser
                {
                    FirstName = userInfo.GivenName,
                    LastName = userInfo.FamilyName,
                    Email = userInfo.Email,
                    UserName = userInfo.Email,
                    SignUpTime = DateTime.Now,
                    AvatarUrl = path
                };

                var result = await _userManager.CreateAsync(user, RandomPasswordGenerator.GenerateRandomPassword());

                if (!result.Succeeded)
                {
                    var errors = CustomValidator.GetErrorsByIdentityResult(result);
                    return BadRequest(errors);
                }
                var roleName = "User";
                var roleresult = _roleManager.CreateAsync(new DbRole
                {
                    Name = roleName

                }).Result;

                result = _userManager.AddToRoleAsync(user, roleName).Result;               

                if (!result.Succeeded) return BadRequest(new { invalid = "We can't create user" });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
            new
            {
                token = _jWTTokenService.CreateToken(user),
                refToken = _jWTTokenService.CreateRefreshToken(user)
            });
        }       
    }
}
