using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;

namespace TouristApp.Domain.Services
{
    public class JWTTokenService: IJWTTokenService
    {
        public string CreateToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager)
        {
            var roles = userManager.GetRolesAsync(user).Result;
            var userImage = userService.GetImageUser(user.Id);
            var claims = new List<Claim>()
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                new Claim("id", user.Id),
                new Claim("name", user.UserName),
                new Claim("image", userImage),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretPhrase")));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials, 
                claims: claims, 
                expires: DateTime.Now.AddMinutes(1));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
