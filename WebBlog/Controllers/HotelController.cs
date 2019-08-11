using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyCalculation.DAL.Entities;
using MyCalculation.Domain.Interfaces;
using MyCalculation.Domain.Models;
using MyCalculation.ViewModels;


namespace WebBlog.Controllers
{
    [Produces("application/json")]
    [Route("api/Hotel")]
    //[RequireHttps]
    public class HotelController : ControllerBase
    {
        readonly UserManager<DbUser> _userManager;
        readonly RoleManager<DbRole> _roleManager;
        readonly SignInManager<DbUser> _signInManager;
        readonly IUserService _userService;
        readonly IEmailSender _emailSender;
        readonly IFileService _fileService;
        readonly EFContext _context;

        public HotelController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,
            IUserService userService,
            IEmailSender emailSender,
            EFContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;
            _context = context;
            _userService = userService;
            _emailSender = emailSender;
            _roleManager = roleManager;
        }

        [HttpGet("list")]
        public IEnumerable<HotelListViewModel> Get()
        {
            var model = _context
                .Hotels
                //.OrderBy(c => c.Class)
                .Select(u => new HotelListViewModel
                {
                    Id = u.Id,
                    Name = u.Name,
                    Description = u.Description,
                    Price = u.Price,
                    Rate = u.Rate,
                    //Class = u.Class

                }).ToList();


            //var model = _context
            //    .Users
            //    .Include(c => c.Profile)
            //    .Include(c => c.UserImage)
            //    .OrderBy(c => c.Email)
            //    .Select(u => new ApplicationUserListViewModel
            //    {
            //        Id = u.Id,
            //        Email = u.Email,
            //        Roles = u.UserRoles.Select(r => new RoleItemViewModel
            //        {
            //            Id = r.Role.Id,
            //            Name = r.Role.Name
            //        }),
            //        FullName = u.Profile.FirstName + ' ' + u.Profile.MiddleName + ' ' + u.Profile.LastName,
            //        UserImage = _userService.GetPathImage(u.UserImage.Path)

            //    })
            //    .ToList();

            return model;
        }



    }
}