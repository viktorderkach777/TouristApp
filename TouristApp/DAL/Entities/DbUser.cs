using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristApp.DAL.Entities
{
    public class DbUser : IdentityUser<long>
    {
        public DbUser()
        {
            Comments = new HashSet<Comment>();
            Orders = new HashSet<Order>();
        }

        public ICollection<DbUserRole> UserRoles { get; set;}

        [Required, StringLength(maximumLength: 250)]
        public string FirstName { get; set; }

        [StringLength(maximumLength: 250)]
        public string MiddleName { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime SignUpTime { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string AvatarUrl { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection< Order> Orders { get; set; }
        public virtual RefreshToken RefreshToken { get; set; }
    }
}
