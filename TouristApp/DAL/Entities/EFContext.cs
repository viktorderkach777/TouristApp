using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace TouristApp.DAL.Entities
{
    public class EFContext : IdentityDbContext<DbUser, DbRole, long, IdentityUserClaim<long>,
    DbUserRole, IdentityUserLogin<long>,
    IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public EFContext(DbContextOptions<EFContext> options)
            : base(options)
        {

        }

        // <summary>
        /// Main job classes
        /// </summary>
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<HotelImage> HotelImages { get; set; }
        public virtual DbSet<HotelParameter> HotelParameters { get; set; }
        public virtual DbSet<HotelSubParameter> HotelSubParameters { get; set; }
        public virtual DbSet<Hotel> Hotels { get; set; }
        public virtual DbSet< Order> Orders { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Tour> Tours { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public virtual DbSet<CityDeparture> CityDepartures { get; set; }
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        // <summary>
        /// Filter tables
        /// </summary>
        public DbSet<FilterName> FilterNames { get; set; }
        public DbSet<FilterValue> FilterValues { get; set; }
        public DbSet<FilterNameGroup> FilterNameGroups { get; set; }
        public DbSet<Filter> Filters { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.ApplyConfiguration(new CountryInitialConfig());
            //builder.ApplyConfiguration(new RegionInitialConfig());
            //builder.ApplyConfiguration(new HotelInitialConfig());
            //builder.ApplyConfiguration(new TourInitialConfig());
            //builder.ApplyConfiguration(new СityDepartureConfig());


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

            builder.Entity<Filter>(filter =>
            {
                filter.HasKey(f => new { f.TourId, f.FilterValueId, f.FilterNameId });

                filter.HasOne(ur => ur.FilterNameOf)
                    .WithMany(r => r.Filtres)
                    .HasForeignKey(ur => ur.FilterNameId)
                    .IsRequired();

                filter.HasOne(ur => ur.FilterValueOf)
                    .WithMany(r => r.Filtres)
                    .HasForeignKey(ur => ur.FilterValueId)
                    .IsRequired();

                filter.HasOne(ur => ur.TourOf)
                    .WithMany(r => r.Filtres)
                    .HasForeignKey(ur => ur.TourId)
                    .IsRequired();
            });

            builder.Entity<FilterNameGroup>(filterNG =>
            {
                filterNG.HasKey(f => new { f.FilterValueId, f.FilterNameId });

                filterNG.HasOne(ur => ur.FilterNameOf)
                    .WithMany(r => r.FilterNameGroups)
                    .HasForeignKey(ur => ur.FilterNameId)
                    .IsRequired();

                filterNG.HasOne(ur => ur.FilterValueOf)
                    .WithMany(r => r.FilterNameGroups)
                    .HasForeignKey(ur => ur.FilterValueId)
                    .IsRequired();
            });


            builder.Entity<Parameter>()
            .HasOne(ur => ur.Parent)
            .WithMany(r => r.Children)
            .HasForeignKey(ur => ur.ParentId);
        }
    }
}
