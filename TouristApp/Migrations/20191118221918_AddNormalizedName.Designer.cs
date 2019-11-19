﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TouristApp.DAL.Entities;

namespace TouristApp.Migrations
{
    [DbContext(typeof(EFContext))]
    [Migration("20191118221918_AddNormalizedName")]
    partial class AddNormalizedName
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<long>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<long>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b =>
                {
                    b.Property<long>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.CityDepartures", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("CityDepartures");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Comments", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatingDate");

                    b.Property<long>("HotelId");

                    b.Property<long?>("HotelsId");

                    b.Property<string>("Message");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("HotelsId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Countries", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.DbRole", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.DbUser", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("AvatarUrl");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("MiddleName");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<DateTime>("SignUpTime");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.DbUserRole", b =>
                {
                    b.Property<long>("UserId");

                    b.Property<long>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Filter", b =>
                {
                    b.Property<long>("TourId");

                    b.Property<long>("FilterValueId");

                    b.Property<long>("FilterNameId");

                    b.HasKey("TourId", "FilterValueId", "FilterNameId");

                    b.HasAlternateKey("FilterNameId", "FilterValueId", "TourId");

                    b.HasIndex("FilterValueId");

                    b.ToTable("tblFilters");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.FilterName", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("tblFilterNames");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.FilterNameGroup", b =>
                {
                    b.Property<long>("FilterValueId");

                    b.Property<long>("FilterNameId");

                    b.HasKey("FilterValueId", "FilterNameId");

                    b.HasAlternateKey("FilterNameId", "FilterValueId");

                    b.ToTable("tblFilterNameGroups");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.FilterValue", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("tblFilterValues");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelImages", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("HotelId");

                    b.Property<string>("HotelImageUrl");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.ToTable("HotelImages");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelParameters", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<long>("HotelId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("HotelId");

                    b.ToTable("HotelParameters");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Hotels", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Class");

                    b.Property<string>("Description");

                    b.Property<double?>("Latitude");

                    b.Property<double?>("Longtitude");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedName");

                    b.Property<decimal?>("Price");

                    b.Property<double?>("Rate");

                    b.Property<long>("RegionId");

                    b.Property<int?>("RoomsCount");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.ToTable("Hotels");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelSubParameters", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("HotelParameterId");

                    b.Property<bool?>("IsFree");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("HotelParameterId");

                    b.ToTable("HotelSubParameters");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Orders", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("TourId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("TourId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.RefreshToken", b =>
                {
                    b.Property<long>("Id");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.HasKey("Id");

                    b.ToTable("tblRefreshTokens");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Regions", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("CountryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.ToTable("Regions");
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Tours", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("CityDepartureId");

                    b.Property<int?>("DaysCount");

                    b.Property<DateTime?>("FromData");

                    b.Property<long>("HotelId");

                    b.Property<decimal?>("Price");

                    b.HasKey("Id");

                    b.HasIndex("CityDepartureId");

                    b.HasIndex("HotelId");

                    b.ToTable("Tours");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<long>", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<long>", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<long>", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<long>", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Comments", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Hotels")
                        .WithMany("Comments")
                        .HasForeignKey("HotelsId");

                    b.HasOne("TouristApp.DAL.Entities.DbUser", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.DbUserRole", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbRole", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.DbUser", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Filter", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.FilterName", "FilterNameOf")
                        .WithMany("Filtres")
                        .HasForeignKey("FilterNameId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.FilterValue", "FilterValueOf")
                        .WithMany("Filtres")
                        .HasForeignKey("FilterValueId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.Tours", "TourOf")
                        .WithMany("Filtres")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.FilterNameGroup", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.FilterName", "FilterNameOf")
                        .WithMany("FilterNameGroups")
                        .HasForeignKey("FilterNameId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.FilterValue", "FilterValueOf")
                        .WithMany("FilterNameGroups")
                        .HasForeignKey("FilterValueId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelImages", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Hotels", "Hotel")
                        .WithMany("HotelImages")
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelParameters", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Hotels", "Hotel")
                        .WithMany("HotelParameters")
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Hotels", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Regions", "Region")
                        .WithMany("Hotels")
                        .HasForeignKey("RegionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.HotelSubParameters", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.HotelParameters", "HotelParameter")
                        .WithMany("HotelSubParameters")
                        .HasForeignKey("HotelParameterId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Orders", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Tours", "Tour")
                        .WithMany("Orders")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.DbUser", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.RefreshToken", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.DbUser", "User")
                        .WithOne("RefreshToken")
                        .HasForeignKey("TouristApp.DAL.Entities.RefreshToken", "Id")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Regions", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.Countries", "Country")
                        .WithMany("Regions")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("TouristApp.DAL.Entities.Tours", b =>
                {
                    b.HasOne("TouristApp.DAL.Entities.CityDepartures", "CityDeparture")
                        .WithMany("Tours")
                        .HasForeignKey("CityDepartureId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TouristApp.DAL.Entities.Hotels", "Hotel")
                        .WithMany("Tours")
                        .HasForeignKey("HotelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
