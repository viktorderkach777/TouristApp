using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;

namespace TouristApp.Domain.Interfaces
{
    public interface IJWTTokenService
    {
        //string CreateToken(IConfiguration configuration, DbUser user, UserManager<DbUser> userManager);
        string CreateToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager);
        string CreateJWTTokenAndRefreshToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager, EFContext db);
        string CreateRefreshToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager, EFContext db);
    }
}
