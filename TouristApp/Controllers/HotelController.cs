﻿using System.Collections.Generic;
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
using Microsoft.Extensions.Configuration;
using TouristApp.Helpers;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;

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
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        readonly EFContext _context;

        public HotelController(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager,
            SignInManager<DbUser> signInManager,
            IFileService fileService,
            IUserService userService,
            IEmailSender emailSender,
            IHostingEnvironment env,
            IConfiguration configuration,

            EFContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _fileService = fileService;
            _context = context;
            _userService = userService;
            _emailSender = emailSender;
            _roleManager = roleManager;
            _configuration = configuration;
            _env = env;
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


        [HttpGet("images")]
        public IEnumerable<ImageItemViewModel> Images()
        {
            var url = _configuration.GetValue<string>("ImagesUrl");
            List<string> imageNames = new List<string>
            {
                "1", "2", "3", "4"
            };
            var model = imageNames
                .Select(x => new ImageItemViewModel
                {
                    Id = int.Parse(x),
                    BigImage = $"{url}/1200_{x}.jpg",
                    SmallImage = $"{url}/268_{x}.jpg"
                }).ToList();

            return model;
        }


        // POST: api/hotel/photo
        [HttpPost("photo")]
        public async Task<IActionResult> Post([FromBody] HotelAddPhotoViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sizes = _configuration.GetValue<string>("ImagesSizes").Split(' ');

            string imageName = Guid.NewGuid().ToString() + ".jpg";
            string base64 = model.imageBase64;
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            var bmp = base64.FromBase64StringToBitMap();
            string fileDestDir = _env.ContentRootPath;
            fileDestDir = Path.Combine(fileDestDir, _configuration.GetValue<string>("ImagesPath"));

            foreach (var element in sizes)
            {
                string fileSave = Path.Combine(fileDestDir, element + "_" + imageName);
                if (bmp != null)
                {
                    int size = Convert.ToInt32(element);
                    var image = ImageHelper.CompressImage(bmp, size, size);
                    image.Save(fileSave, ImageFormat.Jpeg);
                }

            }
                                   
            //string path = _fileService.UploadImage(model.imageBase64);

            _context.HotelImages.Add(new HotelImages
            {
                HotelId = model.HotelId,
                HotelImageUrl = imageName
            });

            await _context.SaveChangesAsync();

            return Ok(model);
        }




    }

}