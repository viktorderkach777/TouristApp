using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using TouristApp.DAL.Entities;
using TouristApp.Domain.Interfaces;
using TouristApp.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;

namespace TouristApp.Controllers
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

        //[HttpGet("list")]

        //public IEnumerable<HotelListViewModel> Get()
        //{
        //    var model = _context
        //        .Tours
        //        .Include(s => s.Hotel)
        //        .Include(d => d.Hotel.Region)
        //        .Include(f => f.Hotel.Region.Country)
        //        .Include(z => z.СityDeparture)
        //        .OrderBy(c => c.Hotel.Class)
        //        .Select(u => new HotelListViewModel
        //        {
        //            Id = u.Id,
        //            СityDeparture ="Київ",  //u.СityDeparture.Name,
        //            Name = u.Hotel.Name,
        //            Region = u.Hotel.Region.Name,
        //            Country = u.Hotel.Region.Country.Name,
        //            Description = u.Hotel.Description,
        //            Price = u.Price* u.DaysCount,
        //            Rate = u.Hotel.Rate,
        //            Class = u.Hotel.Class,
        //            FromData=u.FromData,
        //            Date=u.FromData.ToString().Substring(0, 10),
        //            DaysCount =u.DaysCount

        //        }).ToList();

        //    Thread.Sleep(1000);

        //    return model;
        //}

        [HttpGet("list/{currentPage}")]
        public ToursViewModel Get([FromRoute] int currentPage)
        {
            int page = currentPage;
            int pageSize = 2;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            model.Tours = _context
                .Tours
                .Include(s => s.Hotel)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.СityDeparture)
                .OrderBy(c => c.Hotel.Class)
                .Skip(pageNo * pageSize)
                .Take(pageSize)
                .Select(u => new HotelListViewModel
                {
                    Id = u.Id,
                    СityDeparture = "Київ",  //u.СityDeparture.Name,
                    Name = u.Hotel.Name,
                    Region = u.Hotel.Region.Name,
                    Country = u.Hotel.Region.Country.Name,
                    Description = u.Hotel.Description,
                    Price = u.Price * u.DaysCount,
                    Rate = u.Hotel.Rate,
                    Class = u.Hotel.Class,
                    FromData = u.FromData,
                    Date = u.FromData.ToString().Substring(0, 10),
                    DaysCount = u.DaysCount
                }).ToList();

            int count = _context.Tours.Count();
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return model;
        }
    }



}