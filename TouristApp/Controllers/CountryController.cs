using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TouristApp.DAL.Entities;
using TouristApp.ViewModels;

namespace TouristApp.Controllers
{
    [Produces("application/json")]
    [Route("api/country")]
    public class CountryController : ControllerBase
    {
        private readonly EFContext _context;

        public CountryController(EFContext context)
        {
            _context = context;
        }

        // GET: api/Countries
        [HttpGet]
        public IEnumerable<Countries> GetCountries()
        {
            return _context.Countries;
        }

        [HttpGet("countries")]
        public async Task<ActionResult<IEnumerable<CountriesViewModel>>> Get()
        {

            var model = await _context
               .Countries
               .OrderBy(c => c.Name)
               .Select(u => new SelectViewModel
               {
                   Value = u.Id,
                   Label = u.Name
               })
               .ToListAsync();

            return Ok(model);
        }


        // GET: api/Countries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCountries([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var countries = await _context.Countries.FindAsync(id);

            if (countries == null)
            {
                return NotFound();
            }

            return Ok(countries);
        }



        // PUT: api/Countries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountries([FromRoute] string id, [FromBody] CountriesEditViewModel model)
        {


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Countries country = new Countries
            {
                Id = id,
                Name = model.Name

            };

            

            _context.Entry(country).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var obj = new SelectViewModel
            {
                Value = country.Id,
                Label = country.Name
            };

            return Ok(obj);
        }

        // POST: api/Countries
        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] CountriesAddViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var country = new Countries
            {
                Name = model.Name
            };

            _context.Countries.Add(country);
            
            
            await _context.SaveChangesAsync();

            return Ok(new {country.Id, country.Name});
        }

        // DELETE: api/Country/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountries([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return NotFound();
            }

            
            var regionsToDelete = _context.Regions.Where(c => c.CountryId == id);
            _context.Regions.RemoveRange(regionsToDelete); 

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return Ok(country);
        }

        private bool CountriesExists(string id)
        {
            return _context.Countries.Any(e => e.Id == id);
        }
    }
}