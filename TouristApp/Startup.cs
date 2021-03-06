using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Text;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using TouristApp.Domain.Models.FacebookModels;
using TouristApp.Domain.Services;
using TouristApp.Helpers;

namespace TouristApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EFContext>(opt =>
                opt.UseSqlServer(Configuration
                    .GetConnectionString("DefaultConnection")));

            //services.AddDbContext<EFContext>(options =>
            //options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddSignalR();

           

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFileService, FileService>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IJWTTokenService, JWTTokenService>();
            services.Configure<FacebookAuthSettings>(Configuration.GetSection(nameof(FacebookAuthSettings)));

            //services.AddIdentity<DbUser, IdentityRole>()
            //    .AddEntityFrameworkStores<EFContext>();

            services.AddIdentity<DbUser, DbRole>(options => options.Stores.MaxLengthForKeys = 128)
               .AddEntityFrameworkStores<EFContext>()
               .AddDefaultTokenProviders();

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("SecretPhrase")));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero //�������� �������
                };
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSession();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            //app.UseCors(
            //  builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseSignalR(
                routes =>
                {
                    routes.MapHub<ChatHub>("/chat");
                });

            app.UseAuthentication();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSession();

            #region InitStaticFiles Images
            string pathRoot = InitStaticFiles
                .CreateFolderServer(env, this.Configuration,
                    new string[] { "ImagesPath" });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathRoot),
                RequestPath = new PathString("/" + Configuration.GetValue<string>("ImagesUrl"))
            });

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(pathRoot),
                RequestPath = new PathString("/" + Configuration.GetValue<string>("ImagesHotelUrl"))
            });

            #endregion;

            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), @"UserImages")))
            {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), @"UserImages"));
            }

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"UserImages")),
                RequestPath = new PathString("/UserImages")
            });

            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), @"Uploaded")))
            {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), @"Uploaded"));
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Uploaded")),
                RequestPath = "/Uploaded"
            });


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            SeederDB.SeedDataByAS(app.ApplicationServices, env, this.Configuration);
            SendEmailService.SendInfoStartApp(Configuration, env);
        }
    }
}
