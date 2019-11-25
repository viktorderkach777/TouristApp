using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class DbRole:IdentityRole<long>
    {
        public ICollection<DbUserRole> UserRoles { get; set;}
    }
}
