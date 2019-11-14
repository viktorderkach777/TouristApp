using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using TouristApp.Domain.Models.AccountModels;
using TouristApp.Helpers;
using TouristApp.ViewModels.AccountViewModels;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Collections.Generic;

namespace TouristApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    //[RequireHttps]
    public class AccountController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;       
        readonly IEmailSender _emailSender;
        readonly IFileService _fileService;
        readonly IJWTTokenService _jWTTokenService;       
        private readonly EFContext _context;

        public AccountController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,           
            IEmailSender emailSender,
            IJWTTokenService jWTTokenService,           
            EFContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;         
            _emailSender = emailSender;
            _roleManager = roleManager;
            _jWTTokenService = jWTTokenService;            
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Domain.Models.AccountModels.Credentials credentials)
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
            
            return Ok(
            new
            {
                token = _jWTTokenService.CreateToken(user),
                refToken = _jWTTokenService.CreateRefreshToken(user)
            });            
        }

        [HttpPost("refresh/{refreshToken}")]
        public IActionResult RefreshToken([FromRoute]string refreshToken)
        {
            var _refreshToken = _context.RefreshTokens
                .Include(u=>u.User)
                .SingleOrDefault(m => m.Token == refreshToken);

            if (_refreshToken == null)
            {
                return NotFound("Refresh token not found");
            }           

            _refreshToken.Token = Guid.NewGuid().ToString();
            _context.RefreshTokens.Update(_refreshToken);
            _context.SaveChanges();
            //Thread.Sleep(2000);
            return Ok(
            new {
                token = _jWTTokenService.CreateToken( _refreshToken.User),
                refToken = _refreshToken.Token
            });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]CustomRegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            if (!CaptchaHelper.VerifyAndExpireSolution(this.HttpContext, model.CaptchaKey,
              model.CaptchaText))
            {
                var invalid = new Dictionary<string, string>();
                invalid.Add("captchaText", "Error captcha text. Renew captcha and repeat again.");
                return BadRequest(invalid);
            }

            string path = _fileService.UploadImage(model.ImageBase64);

            var user = new DbUser
            {
                UserName = model.Email,
                Email = model.Email,
                DateOfBirth = model.DateOfBirth,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                SignUpTime = DateTime.Now,
                AvatarUrl = path
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
            
            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
            //new
            //{
            //    token = _jWTTokenService.CreateToken(user),
            //    refToken = _jWTTokenService.CreateRefreshToken(user)
            //}
            );
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
                values: new { userId = user.Id, code },
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