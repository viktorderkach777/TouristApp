using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
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
using Microsoft.EntityFrameworkCore;

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
                .Tours
                .Include(s=>s.Hotel)
                .OrderBy(c => c.Hotel.Class)
                .Select(u => new HotelListViewModel
                {
                    Id = u.Id,
                    Name = u.Hotel.Name,
                    Description = u.Hotel.Description,
                    Price = u.Price,
                    Rate = u.Hotel.Rate,
                    Class = u.Hotel.Class

                }).ToList();

            Thread.Sleep(1000);
            

            return model;
        }



    }
}