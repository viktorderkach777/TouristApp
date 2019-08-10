using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MyCalculation.DAL.Entities;

namespace MyCalculation.Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(IConfiguration configuration, DbUser user, UserManager<DbUser> userManager);
    }
}
