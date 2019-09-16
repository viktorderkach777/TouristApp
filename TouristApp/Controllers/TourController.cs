﻿using System;
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
                    Images = u.Hotel.HotelImages.Where(
                        f => f.HotelId == u.HotelId).Select(x => new HotelPhotoViewModel
                    {
                        Name= $"{url}/1200_{x.HotelImageUrl}"  
                    }).ToList()
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

            return Ok(tours);
        }

        private bool ToursExists(string id)
        {
            return _context.Tours.Any(e => e.Id == id);
        }
    }
}