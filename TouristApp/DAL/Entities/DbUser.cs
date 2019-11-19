using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class DbUser : IdentityUser<long>
    {
        public DbUser()
        {
            Comments = new HashSet<Comments>();
            Orders = new HashSet<Orders>();
        }

        public ICollection<DbUserRole> UserRoles { get; set;}       
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime SignUpTime { get; set; } 
        public string AvatarUrl { get; set; }
        public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
        public virtual RefreshToken RefreshToken { get; set; }
    }
}
