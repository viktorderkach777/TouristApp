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
using System.Linq;
using Newtonsoft.Json;

namespace TouristApp.Domain.Services
{
    public class JWTTokenService : IJWTTokenService
    {
        private readonly EFContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public JWTTokenService(
            EFContext context,
            UserManager<DbUser> userManager,
            IConfiguration configuration,
            IUserService userService)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _userService = userService;
        }

        public string CreateToken(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            var userImage = _userService.GetImageUser(user.Id);
            var claims = new List<Claim>()
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.UserName),
                new Claim("image", userImage),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretPhrase")));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                signingCredentials: signingCredentials,
                claims: claims,
                expires: DateTime.Now.AddDays(1));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


        public string CreateRefreshToken(DbUser user)
        {
            var _refreshToken = _context.RefreshTokens
              .SingleOrDefault(m => m.Id == user.Id);

            if (_refreshToken == null)
            {
                RefreshToken t = new RefreshToken
                {
                    Id = user.Id,
                    Token = Guid.NewGuid().ToString()
                };
                _context.RefreshTokens.Add(t);
                _context.SaveChanges();
                _refreshToken = t;
            }
            else
            {
                _refreshToken.Token = Guid.NewGuid().ToString();
                _context.RefreshTokens.Update(_refreshToken);
                _context.SaveChanges();
            }

            return _refreshToken.Token;
        }
    }
}
