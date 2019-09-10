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
using System.Threading.Tasks;

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
        //public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        //{
        //    return await _context.TodoItems.ToListAsync();
        [HttpGet("countries")]
        public async Task<ActionResult<IEnumerable<CountriesViewModel>>> Get()
        {

            var model = await  _context
               .Countries
               .OrderBy(c => c.Name)
               .Select(u => new CountriesViewModel
               {
                   Id=u.Id,
                   Name=u.Name
               })
               .ToListAsync();

            return Ok(model);
        }


        [HttpGet("regions/{id}")]
        public async Task<ActionResult<IEnumerable<RegionViewModel>>> Get([FromRoute] int id)
        {

            var model = await _context
               .Regions
               .Where(f => f.CountryId == id.ToString())
               .OrderBy(c => c.Name)
               .Select(u => new RegionViewModel
               {
                   Id = u.Id,
                   Name = u.Name
               })
               .ToListAsync();

            return Ok(model);
        }

        

        //Get api/Hotel/create
        [HttpPost("regions/create")]
        public IActionResult Post([FromBody] RegionViewModel model)
        {
            
            _context.Regions.Add(new Regions
            {
                Name = model.Name,
                CountryId= model.Id
            });
            _context.SaveChanges();
            return Ok();

        }

        [HttpPost("countries/create")]
        public IActionResult Post([FromBody]  CountriesAddViewModel model)
        {
            _context.Countries.Add(new Countries
            {
                Name = model.Name
            });
            _context.SaveChanges();
            return Ok();

        }



        [HttpGet("list/{currentPage}")]
        public async Task <ActionResult <IEnumerable<ToursViewModel>>> Get ([FromRoute] int currentPage,string sortOrder)
        {
            int page = currentPage;
            int pageSize = 2;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            var query = await _context
                .Tours
                .Include(s => s.Hotel)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
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
                }).ToListAsync();

           
            
            switch (sortOrder)
            {
                case "name":
                    query = query.OrderBy(c => c.Name).ToList();
                    break;
                case "name_desc":
                    query = query.OrderByDescending(c => c.Name).ToList();
                    break;

                case "rate":
                    query = query.OrderBy(c => c.Rate).ToList();
                    break;
                case "rate_desc":
                    query = query.OrderByDescending(c => c.Rate).ToList();
                    break;

                default:
                    query = query.OrderBy(c => c.Name).ToList();
                    break;
            }

            query = query
                .Skip(pageNo * pageSize)
                .Take(pageSize).ToList();

           // var result = model.Tours.OrderBy(c => c.Class);
            //model.Tours = await _context
            //    .Tours
            //    .Include(s => s.Hotel)
            //    .Include(d => d.Hotel.Region)
            //    .Include(f => f.Hotel.Region.Country)
            //    .Include(z => z.СityDeparture)
            //    .OrderBy(c => c.Hotel.Class)
            //    .Skip(pageNo * pageSize)
            //    .Take(pageSize)
            //    .Select(u => new HotelListViewModel
            //    {
            //        Id = u.Id,
            //        СityDeparture = "Київ",  //u.СityDeparture.Name,
            //        Name = u.Hotel.Name,
            //        Region = u.Hotel.Region.Name,
            //        Country = u.Hotel.Region.Country.Name,
            //        Description = u.Hotel.Description,
            //        Price = u.Price * u.DaysCount,
            //        Rate = u.Hotel.Rate,
            //        Class = u.Hotel.Class,
            //        FromData = u.FromData,
            //        Date = u.FromData.ToString().Substring(0, 10),
            //        DaysCount = u.DaysCount
            //    }).ToListAsync();



            model.Tours = query;

            int count = _context.Tours.Count();
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return  Ok(model);
        }

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<ToursViewModel>>> Get( [FromBody] SearchModel searchModel)
        {
            int page = 1;
            int pageSize = 2;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            model.Tours = await _context
                .Tours
                .Include(s => s.Hotel)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
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
                }).ToListAsync();

            int count = _context.Tours.Count();
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return Ok(model);

        }

            //public async Task<IActionResult> Index(string sortOrder)
            //{
            //    //ViewData["NameSortParm"] = String.IsNullOrEmpty(sortOrder) ? "name_desc" : "";
            //    //ViewData["DateSortParm"] = sortOrder == "Date" ? "date_desc" : "Date";
            //    //var students = from s in _context.Students
            //    //               select s;
            //    //switch (sortOrder)
            //    //{
            //    //    case "name_desc":
            //    //        students = students.OrderByDescending(s => s.LastName);
            //    //        break;
            //    //    case "Date":
            //    //        students = students.OrderBy(s => s.EnrollmentDate);
            //    //        break;
            //    //    case "date_desc":
            //    //        students = students.OrderByDescending(s => s.EnrollmentDate);
            //    //        break;
            //    //    default:
            //    //        students = students.OrderBy(s => s.LastName);
            //    //        break;
            //    //}
            //    return View(await students.AsNoTracking().ToListAsync());
            //}



        }

}