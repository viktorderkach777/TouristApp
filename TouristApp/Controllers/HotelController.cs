using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TouristApp.DAL.Entities;
using TouristApp.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using TouristApp.Helpers;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Drawing.Imaging;


namespace TouristApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Hotel")]
    //[RequireHttps]
    public class HotelController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _env;
        readonly EFContext _context;

        public HotelController(
            IHostingEnvironment env,
            IConfiguration configuration,
            EFContext context)
        {
            _context = context;
            _configuration = configuration;
            _env = env;
        }

        // GET: api/hotel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<HotelSelectListViewModel>>> Get([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var hotels = await _context
               .Hotels
               .Where(f => f.RegionId == id)
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
            _context.Hotels.Add(new Hotel
            {
                Name = model.Name,
                Description = model.Description,
                Class = model.Class,
                //Price = model.Price,
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

            string imageName = Guid.NewGuid().ToString().Substring(0, 8) + ".jpg";
            string base64 = model.ImageBase64;
            if (base64.Contains(","))
            {
                base64 = base64.Split(',')[1];
            }

            var bmp = base64.FromBase64StringToBitMap();           
            var hotel = _context.Hotels.FirstOrDefault(f => f.Id == model.HotelId);

            if (hotel == null)
            {
                return BadRequest(new { invalid = "Hotel does not exist" });
            }

            string fileDestDir = Path.Combine(_env.ContentRootPath, _configuration.GetValue<string>("ImagesPath"), hotel.NormalizedName);

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

            _context.HotelImages.Add(new HotelImage
            {
                HotelId = model.HotelId,
                HotelImageUrl = imageName
            });

            await _context.SaveChangesAsync();

            return Ok(model);
        }
    }
}