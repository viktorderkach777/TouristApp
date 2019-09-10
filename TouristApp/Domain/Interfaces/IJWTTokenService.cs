using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;

namespace TouristApp.Domain.Interfaces
{
    public interface IJWTTokenService
    {        
        string CreateToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager);       
        string CreateRefreshToken(IConfiguration configuration, IUserService userService, DbUser user, UserManager<DbUser> userManager, EFContext db);
    }
}
