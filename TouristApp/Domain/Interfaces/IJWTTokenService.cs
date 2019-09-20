using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;

namespace TouristApp.Domain.Interfaces
{
    public interface IJWTTokenService
    {        
        string CreateToken(DbUser user);       
        string CreateRefreshToken(DbUser user);
    }
}
