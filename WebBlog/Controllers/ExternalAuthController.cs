using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyCalculation.Domain.Models;
using MyCalculation.Helpers;
using MyCalculation.ViewModels;
using Microsoft.AspNetCore.Identity;
using MyCalculation.DAL.Entities;
using MyCalculation.Domain.Interfaces;
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Http;
using MyCalculation.Domain.Models.Facebook;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Drawing.Imaging;

namespace MyCalculation.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExternalAuthController : Controller
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;
        readonly IUserService _userService;
        readonly IEmailSender _emailSender;
        readonly IFileService _fileService;
        readonly EFContext _context;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,
            IUserService userService,
            IEmailSender emailSender,
            EFContext context,
            IOptions<FacebookAuthSettings> fbAuthSettingsAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;
            _context = context;
            _userService = userService;
            _emailSender = emailSender;
            _roleManager = roleManager;
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
        }

        // POST api/externalauth/facebook
        [HttpPost]
        public async Task<IActionResult> Facebook([FromBody]FacebookAuthViewModel model)
        {
            // 1.generate an app access token
            var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);
            // 2. validate the user access token
            var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {                
                return BadRequest(new { invalid = "Invalid facebook token!" });
            }

            // 3. we've got a valid token so we can request user data from fb
            var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
            Debug.WriteLine(userInfoResponse);
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            Debug.WriteLine(userInfo);

            // 4. ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(userInfo.Email);
           
            string path = _fileService.UploadFacebookImage(userInfo.Picture.Data.Url);           

            if (user == null)
            {
                user = new DbUser
                {
                    FirstName = userInfo.FirstName,
                    LastName = userInfo.LastName,                  
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

                await _signInManager.SignInAsync(user, isPersistent: false);

                if (!result.Succeeded) return BadRequest(new { invalid = "We can't create user" });

            }
            else
            {               
                user = await _userManager.FindByEmailAsync(userInfo.Email);

                if (user == null)
                {                    
                    return BadRequest(new { invalid = "Failed to create local user account." });
                }
            }           

          
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
    }
}
