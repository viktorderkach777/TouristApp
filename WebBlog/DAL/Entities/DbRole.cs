using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class DbRole:IdentityRole
    {
        public ICollection<DbUserRole> UserRoles { get; set;}

    }
}
