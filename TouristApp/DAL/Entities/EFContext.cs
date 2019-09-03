using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TouristApp.DAL.Configuration.InitialDataConfiguration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class EFContext : IdentityDbContext<DbUser, DbRole, string, IdentityUserClaim<string>,
DbUserRole, IdentityUserLogin<string>,
IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public EFContext(DbContextOptions<EFContext> options)
            : base(options)
        {

        }

        //public DbSet<UserProfile> UserProfiles { get; set; }
        //public DbSet<UserImage> UserImages { get; set; }

        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<HotelImages> HotelImages { get; set; }
        public virtual DbSet<HotelParameters> HotelParameters { get; set; }
        public virtual DbSet<HotelSubParameters> HotelSubParameters { get; set; }
        public virtual DbSet<Hotels> Hotels { get; set; }
        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Regions> Regions { get; set; }
        public virtual DbSet<Tours> Tours { get; set; }
        public virtual DbSet<СityDeparture> СityDeparture { get; set; }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfiguration(new CountryInitialConfig());
            builder.ApplyConfiguration(new RegionInitialConfig());
            builder.ApplyConfiguration(new HotelInitialConfig());
            builder.ApplyConfiguration(new TourInitialConfig());
            builder.ApplyConfiguration(new СityDepartureConfig());
            


            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }
    }
}
