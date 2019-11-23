using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TouristApp.DAL.Entities;
using TouristApp.ViewModels;

namespace TouristApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController : ControllerBase
    {
        private readonly EFContext _context;

        public RegionController(EFContext context)
        {
            _context = context;
        }

        // GET: api/Region
        [HttpGet]
        public IEnumerable<Region> GetRegions()
        {
            return _context.Regions;
        }

        // GET: api/Region/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<RegionViewModel>>> Get([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var regions = await _context
               .Regions
               .Where(f => f.CountryId == id)
               .OrderBy(c => c.Name)
               .Select(u => new RegionViewModel
               {
                   Id = u.Id,
                   Name = u.Name
               })
               .ToListAsync();

            if (regions == null)
            {
                return NotFound();
            }

            return Ok(regions);
        }
        //[HttpGet("regions/{id}")]
        //public async Task<ActionResult<IEnumerable<RegionViewModel>>> Get([FromRoute] string id)
        //{

        //    var regions = await _context
        //       .Regions
        //       .Where(f => f.CountryId == id.ToString())
        //       .OrderBy(c => c.Name)
        //       .Select(u => new RegionViewModel
        //       {
        //           Id = u.Id,
        //           Name = u.Name
        //       })
        //       .ToListAsync();

        //    return Ok(regions);
        //}


        // PUT: api/Region/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegions([FromRoute] long id, [FromBody] Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != region.Id)
            {
                return BadRequest();
            }

            _context.Entry(region).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(id))
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

        // POST: api/region/create
        [HttpPost("create")]

        public async Task<IActionResult> PostRegions([FromBody] RegionViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Regions.Add(new Region
            {
                Name = model.Name,
                CountryId = model.Id
            });
            await _context.SaveChangesAsync();

           return Ok();
        }
        

        // DELETE: api/Region/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegions([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var region = await _context.Regions.FindAsync(id);
            if (region == null)
            {
                return NotFound();
            }

            _context.Regions.Remove(region);
            await _context.SaveChangesAsync();

            return Ok(region);
        }

        private bool RegionExists(long id)
        {
            return _context.Regions.Any(e => e.Id == id);
        }
    }
}