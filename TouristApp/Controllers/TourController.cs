using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;
using TouristApp.ViewModels;

namespace TouristApp.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //[Route("api/tour")]
    [Produces("application/json")]
    [Route("api/tour")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IConfiguration _configuration;

        public TourController(EFContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Tour/list/id

        [HttpGet("list/{currentPage}")]
        public async Task<ActionResult<IEnumerable<ToursViewModel>>> Get([FromRoute] int currentPage, string sortOrder)
        {
            int page = currentPage;
            int pageSize = 2;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            var url = _configuration.GetValue<string>("ImagesHotelUrl");

            var query = await _context
                .Tours.AsQueryable()
                .Include(s => s.Hotel)
                .Include(s => s.Hotel.HotelImages)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
                .Select(u => new TourListViewModel
                {
                    Id = u.Id,
                    СityDeparture = "Київ",
                    Name = u.Hotel.Name,
                    Region = u.Hotel.Region.Name,
                    Country = u.Hotel.Region.Country.Name,
                    Description = u.Hotel.Description,
                    Price = u.Price * u.DaysCount,
                    Rate = u.Hotel.Rate,
                    Class = u.Hotel.Class,
                    FromData = u.FromData,
                    Date = u.FromData.ToString().Substring(0, 10),
                    DaysCount = u.DaysCount,
                    ImagePath = url + "/1200_" + u.Hotel.HotelImages.FirstOrDefault(
                        f => f.HotelId == u.HotelId).HotelImageUrl,

                    //Images = u.Hotel.HotelImages.Where(
                    //    f => f.HotelId == u.HotelId).Select(x => new HotelPhotoViewModel
                    //{
                    //    Name= $"{url}/1200_{x.HotelImageUrl}"  
                    //}).ToList()

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

            model.Tours = query;

            int count = _context.Tours.Count();
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return Ok(model);
        }




        // GET: api/Tour/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTours([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tours = await _context.Tours.FindAsync(id);

            if (tours == null)
            {
                return NotFound();
            }

            return Ok(tours);
        }

        // PUT: api/Tour/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTours([FromRoute] string id, [FromBody] Tours tours)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tours.Id)
            {
                return BadRequest();
            }

            _context.Entry(tours).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToursExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/tour/create
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] TourAddViewModel model)

        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Tours.Add(new Tours
            {
                HotelId = model.HotelId,
                //CityDepartureId=model.CityDepartureId,
                DaysCount = model.DaysCount,
                Price = model.Price * model.DaysCount,
                FromData = model.FromData
            });


            await _context.SaveChangesAsync();

            return Ok(model);
        }

        [HttpPost("list")]
        public async Task<ActionResult<IEnumerable<ToursViewModel>>> Post([FromBody] ToursListViewModel filter)
        {
            int page = filter.CurrentPage;
            int pageSize = 2;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            var url = _configuration.GetValue<string>("ImagesHotelUrl");
              
            var query = await _context
                .Tours
                .Include(s => s.Hotel)
                .Include(s => s.Hotel.HotelImages)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
                .Select(u => new TourListViewModel
                {
                    Id = u.Id,
                    СityDeparture = "Київ",
                    Name = u.Hotel.Name,
                    Region = u.Hotel.Region.Name,
                    Country = u.Hotel.Region.Country.Name,
                    Description = u.Hotel.Description,
                    Price = u.Price * u.DaysCount,
                    Rate = u.Hotel.Rate,
                    Class = u.Hotel.Class,
                    FromData = u.FromData,
                    Date = u.FromData.ToString().Substring(0, 10),
                    DaysCount = u.DaysCount,
                    ImagePath = url + "/1200_" + u.Hotel.HotelImages.FirstOrDefault(
                        f => f.HotelId == u.HotelId).HotelImageUrl,

                }).ToListAsync();

            if (!String.IsNullOrEmpty(filter.searchString))
            {
                query = query.Where(s => s.Name.Contains(filter.searchString)
                                       || s.Region.Contains(filter.searchString)).ToList();
            }

            switch (filter.sortOrder)
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

            model.Tours = query;

            int count = _context.Tours.Count();
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return Ok(model);
        }


        [HttpGet("images/{id}")]
        public IEnumerable<ImageItemViewModelNext2> Images(string id)
        {
            var serverUrl = "http://localhost:44318/";
            var url = _configuration.GetValue<string>("ImagesHotelUrl");

            var HotelId = _context.Tours.FirstOrDefault(f => f.Id == id).HotelId;

            var images = _context.HotelImages.Where(
                f => f.HotelId == HotelId).Select(x => new ImageItemViewModelNext2
                {
                    Id = x.Id,
                    original = $"{serverUrl}{url}/1200_{x.HotelImageUrl}",
                    thumbnail = $"{serverUrl}{url}/268_{x.HotelImageUrl}"
                }).ToList();

            return images;
        }

        [HttpGet("single/{id}")]
        public async Task<ActionResult<SingleTourViewModel>> Get([FromRoute] string id)
        {

            var url = _configuration.GetValue<string>("ImagesHotelUrl");
            var serverUrl = "http://localhost:44318/";
            var tour = await _context
                .Tours
                .Where(a => a.Id == id)
                .Include(s => s.Hotel)
                .Include(s => s.Hotel.HotelImages)
                .Include(d => d.Hotel.Region)
                .Include(f => f.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
                .Select(u => new SingleTourViewModel
                {
                    Id = u.Id,
                    СityDeparture = "Київ",
                    Name = u.Hotel.Name,
                    Region = u.Hotel.Region.Name,
                    Country = u.Hotel.Region.Country.Name,
                    Description = u.Hotel.Description,
                    Price = u.Price * u.DaysCount,
                    Rate = u.Hotel.Rate,
                    Class = u.Hotel.Class,
                    FromData = u.FromData,
                    Date = u.FromData.ToString().Substring(0, 10),
                    DaysCount = u.DaysCount,
                    //ImagePath = url + "/1200_" + u.Hotel.HotelImages.FirstOrDefault(
                    //    f => f.HotelId == u.HotelId).HotelImageUrl,

                    Images = u.Hotel.HotelImages.Where(
                        f => f.HotelId == u.HotelId).Select(x => new HotelPhotoViewModel
                        {
                            Id = x.Id,
                            original = $"{serverUrl}{url}/1200_{x.HotelImageUrl}",
                            thumbnail = $"{serverUrl}{url}/268_{x.HotelImageUrl}"
                        }).ToList()
                }).SingleAsync();
            return tour;
        }






        // DELETE: api/Tour/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTours([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tours = await _context.Tours.FindAsync(id);
            if (tours == null)
            {
                return NotFound();
            }

            _context.Tours.Remove(tours);
            await _context.SaveChangesAsync();

            return Ok(tours.Id);
        }

        private bool ToursExists(string id)
        {
            return _context.Tours.Any(e => e.Id == id);
        }
    }
}