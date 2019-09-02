﻿using Microsoft.AspNetCore.Identity;
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
    public class Token
    {
        public string token;
        public string refToken;
    }

    public class JWTTokenService : IJWTTokenService
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

        public string CreateJWTTokenAndRefreshToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager, EFContext db)
        {
            var _refreshToken = db.RefreshTokens
               .SingleOrDefault(m => m.Id == user.Id);

            if (_refreshToken == null)
            {
                RefreshToken t = new RefreshToken
                {
                    Id = user.Id,
                    Token = Guid.NewGuid().ToString()
                };
                db.RefreshTokens.Add(t);
                db.SaveChanges();
                _refreshToken = t;
            }
            else
            {
                _refreshToken.Token = Guid.NewGuid().ToString();
                db.RefreshTokens.Update(_refreshToken);
                db.SaveChanges();
            }

            Token tt = new Token
            {
                token = CreateToken(configuration, userService, user, userManager),
                refToken = _refreshToken.Token
            };

            return JsonConvert.SerializeObject(tt, Formatting.Indented);
        }

        public string CreateRefreshToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager, EFContext db)
        {
            var _refreshToken = db.RefreshTokens
              .SingleOrDefault(m => m.Id == user.Id);

            if (_refreshToken == null)
            {
                RefreshToken t = new RefreshToken
                {
                    Id = user.Id,
                    Token = Guid.NewGuid().ToString()
                };
                db.RefreshTokens.Add(t);
                db.SaveChanges();
                _refreshToken = t;
            }
            else
            {
                _refreshToken.Token = Guid.NewGuid().ToString();
                db.RefreshTokens.Update(_refreshToken);
                db.SaveChanges();
            }

            return _refreshToken.Token;           
        }
    }
}
