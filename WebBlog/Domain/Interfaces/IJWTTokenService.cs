using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;

namespace TouristApp.Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(IConfiguration configuration, DbUser user, UserManager<DbUser> userManager);
    }
}
