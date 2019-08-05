using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using WebBlog.DAL.Entities;
using WebBlog.Domain.Interfaces;
using WebBlog.Domain.Models;
using WebBlog.Helpers;
using WebBlog.ViewModels;

namespace WebBlog.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    //[RequireHttps]
    public class AccountController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;
        readonly IUserService _userService;
        readonly IEmailSender _emailSender;
        readonly IFileService _fileService;
        readonly EFContext _context;

        public AccountController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,
            IUserService userService,
            IEmailSender emailSender,
            EFContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;
            _context = context;
            _userService = userService;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Domain.Models.Credentials credentials)
        {
            if (!ModelState.IsValid)
            {
                
                return BadRequest(new { invalid="Problem validation" });
            }

            var result = await _signInManager
                .PasswordSignInAsync(credentials.Email, credentials.Password,
                false, false);
            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Не правильно введені дані!" });
            }
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));
        }

        private string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;


            var claims = new List<Claim>()
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                new Claim("id", user.Id),
                new Claim("name", user.UserName),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]CustomRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = new DbUser
            {
                UserName = model.Email,
                Email = model.Email,
                DateOfBirth = model.DateOfBirth,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                SignUpTime = DateTime.Now
            };

            var result = await _userManager
                .CreateAsync(user, model.Password);

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

            _userService.AddUserProfile(user.Id, model);
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user)); 
        }

        [HttpPost("ChangePassword")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }

            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
                return BadRequest(new { invalid = "User is not found" });

            IdentityResult result =
                    await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                var errrors = CustomValidator.GetErrorsByIdentityResult(result);
                return BadRequest(errrors);
            }

            return Ok();
        }

        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }

            var user = await _userManager.FindByNameAsync(model.Email);
            if (user == null /*|| !(await _userManager.IsEmailConfirmedAsync(user))*/)
            {
                return BadRequest(new { invalid = "User with this email was not found" });
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            var callbackUrl = Url.Action(
                "",
                "resetpassword",
                //pageHandler: null,
                values: new { userId = user.Id, code = code },
                protocol: Request.Scheme);
            await _emailSender.SendEmailAsync(model.Email, "Reset Password",
               $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");

            return Ok(new { answer = "Check your email" });
        }

        [HttpPost("ResetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errrors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errrors);
            }
            var user = await _userManager.FindByIdAsync(model.UserId);
            if (user == null)
            {
                return BadRequest(new { invalid = "User is not found" });
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (!result.Succeeded)
            {
                var errrors = CustomValidator.GetErrorsByIdentityResult(result);
                return BadRequest(errrors);
            }
            return Ok();
        }



    }
}