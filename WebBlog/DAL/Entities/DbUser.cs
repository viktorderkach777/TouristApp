using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebBlog.DAL.Entities
{
    public class DbUser : IdentityUser
    {
        public ICollection<DbUserRole> UserRoles { get; set;}
        public virtual UserProfile Profile { get; set; }
        public virtual UserImage UserImage { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
