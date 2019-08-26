using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using TouristApp.Helpers;
using TouristApp.ViewModels;
using Microsoft.AspNetCore.Identity;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using System.Net.Http;
using TouristApp.Domain.Models.FacebookModels;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace TouristApp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FacebookAuthController : Controller
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;             
        readonly IFileService _fileService;
        readonly IJWTTokenService _jWTTokenService;
        readonly IConfiguration _configuration;
        readonly IUserService _userService;
        private readonly FacebookAuthSettings _fbAuthSettings;       
        private static readonly HttpClient Client = new HttpClient();

        public FacebookAuthController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,                     
            IJWTTokenService jWTTokenService,
            IConfiguration configuration,
            IUserService userService,
            IOptions<FacebookAuthSettings> fbAuthSettingsAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;                            
            _roleManager = roleManager;
            _fbAuthSettings = fbAuthSettingsAccessor.Value;
            _jWTTokenService = jWTTokenService;
            _configuration = configuration;
            _userService = userService;
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
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);           

            // 4. ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(userInfo.Email);                 

            if (user == null)
            {
                string path = _fileService.UploadFacebookImage(userInfo.Picture.Data.Url);

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
            return Ok(_jWTTokenService.CreateToken(_configuration, _userService, user, _userManager));
        }        
    }
}
