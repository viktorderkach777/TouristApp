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

        

        // GET: api/hotel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<HotelSelectListViewModel>>> Get([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hotels = await _context
               .Hotels
               .Where(f => f.RegionId == id.ToString())
               .OrderBy(c => c.Name)
               .Select(u => new HotelSelectListViewModel
               {
                   Id = u.Id,
                   Name = u.Name
               })
               .ToListAsync();

            if (hotels == null)
            {
                return NotFound();
            }

            return Ok(hotels);
        }




        // POST: api/hotel/create
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] HotelAddViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Hotels.Add(new Hotels
            {
                Name = model.Name,
                Description = model.Description,
                Class =model.Class,
                Price = model.Price,
                RoomsCount = model.RoomsCount,
                RegionId = model.RegionId
            });


            await _context.SaveChangesAsync();

            return Ok(model);
        }

        // POST: api/hotel/photo
        [HttpPost("photo")]
        public async Task<IActionResult> Post([FromBody] HotelAddPhotoViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string path = _fileService.UploadImage(model.imageBase64);

            _context.HotelImages.Add(new HotelImages
            {
                HotelId = model.HotelId,
                HotelImageUrl = path
            });

            await _context.SaveChangesAsync();

            return Ok(model);
        }




    }

}