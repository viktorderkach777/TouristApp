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
using TouristApp.Helpers;
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



        private List<FNameViewModel> GetListFilters(EFContext context)
        {
            var queryName = from f in context.FilterNames.AsQueryable()
                            select f;
            var queryGroup = from g in context.FilterNameGroups.AsQueryable()
                             select g;

            //Отримуємо загальну множину значень
            var query = from u in queryName
                        join g in queryGroup on u.Id equals g.FilterNameId into ua
                        from aEmp in ua.DefaultIfEmpty()
                        select new
                        {
                            FNameId = u.Id,
                            FName = u.Name,
                            FValueId = aEmp != null ? aEmp.FilterValueId : "0",
                            FValue = aEmp != null ? aEmp.FilterValueOf.Name : null,
                        };

            //Групуємо по іменам і сортуємо по спаданню імен
            var groupNames = (from f in query
                              group f by new
                              {
                                  Id = f.FNameId,
                                  Name = f.FName
                              } into g
                              //orderby g.Key.Name
                              select g).OrderByDescending(g => g.Key.Name);

            //По групах отримуємо
            var result = from fName in groupNames
                         select
                         new FNameViewModel
                         {
                             Id = fName.Key.Id,
                             Name = fName.Key.Name,
                             Children = (from v in fName
                                         group v by new FValueViewModel
                                         {
                                             Id = v.FValueId,
                                             Name = v.FValue
                                         } into g
                                         select g.Key)
                                         .OrderBy(l => l.Name).ToList()
                         };

            return result.ToList();
        }

        private List<ToursViewModel> GetToursByFilter(string[] values, List<FNameViewModel> filtersList)
        {
            string[] filterValueSearchList = values;
            var query = _context
                .Tours
                .Include(f => f.Filtres)
                .AsQueryable();
            foreach (var fName in filtersList)
            {
                int count = 0; //Кількість співпадінь у даній групі фільтрів
                var predicate = PredicateBuilder.False<Tours>();
                foreach (var fValue in fName.Children)
                {
                    for (int i = 0; i < filterValueSearchList.Length; i++)
                    {
                        var idV = fValue.Id;
                        if (filterValueSearchList[i] == idV)
                        {
                            predicate = predicate
                                .Or(p => p.Filtres
                                    .Any(f => f.FilterValueId == idV));
                            count++;
                        }
                    }
                }
                if (count != 0)
                    query = query.Where(predicate);
            }
            var listProductSearch = query.Select(p => new ToursViewModel
            {
                //Id = p.Id,
                //Price = p.Price
                CurrentPage=10
            }).ToList();
            return listProductSearch;

            //return null;
        }

        //version 1
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

            if (filter.Filters.Count != 0)
            {
                List<string> countryFilter = new List<string>();
                foreach (var item in filter.Filters[0].Data)
                {
                    if (item.isChecked)
                    {
                        countryFilter.Add(item.Value);
                    }
                }
                if (countryFilter.Count != 0)
                {
                    query = query.Where(s => s.Country.Split('|')
                             .Select(arrayElement => arrayElement.Trim())
                              .Any(value => countryFilter.Contains(value)))
                              .ToList();
                }
            }

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

            int count = query.Count();

            query = query
                .Skip(pageNo * pageSize)
                .Take(pageSize).ToList();

            model.Tours = query;
            model.sortOrder = filter.sortOrder;

            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            return Ok(model);
        }


        //version 2
        //[HttpPost("list")]
        //public async Task<ActionResult<List<ToursViewModel>>> Post([FromBody] ToursListViewModel parameters)
        //{
        //    int page = parameters.CurrentPage;
        //    int pageSize = 2;
        //    int pageNo = page - 1;
        //    ToursViewModel model = new ToursViewModel();

        //    var url = _configuration.GetValue<string>("ImagesHotelUrl");

        //    var query = _context
        //        .Tours
        //        .Include(s => s.Hotel)
        //            .ThenInclude(hotel => hotel.Name)
        //        .Include(d => d.Hotel.Region)
        //            .ThenInclude(region => region.Name)
        //        .Include(f => f.Hotel.Region.Country)
        //            .ThenInclude(country => country.Name)
        //        .Include(s => s.Hotel.HotelImages)
        //        .Include(z => z.CityDeparture)
        //        .AsQueryable();

        //    //if (parameters.Filters.Count != 0)
        //    //{
        //    //    List<string> countryFilter = new List<string>();
        //    //    foreach (var item in parameters.Filters[0].Data)
        //    //    {
        //    //        if (item.isChecked)
        //    //        {
        //    //            countryFilter.Add(item.Value);
        //    //        }
        //    //    }
        //    //    if (countryFilter.Count != 0)
        //    //    {
        //    //        query = query.Where(s => s.Hotel.Region.Country.Name.Split('|')
        //    //                 .Select(arrayElement => arrayElement.Trim())
        //    //                  .Any(value => countryFilter.Contains(value)));
        //    //    }
        //    //}

        //    if (!String.IsNullOrEmpty(parameters.searchString))
        //    {
        //        query = query.Where(s => s.Hotel.Name.Contains(parameters.searchString)
        //                               || s.Hotel.Region.Name.Contains(parameters.searchString));
        //    }

        //    switch (parameters.sortOrder)
        //    {
        //        case "name":
        //            query = query.OrderBy(c => c.Hotel.Name);
        //            break;
        //        case "name_desc":
        //            query = query.OrderByDescending(c => c.Hotel.Name);
        //            break;

        //        case "rate":
        //            query = query.OrderBy(c => c.Hotel.Rate);
        //            break;
        //        case "rate_desc":
        //            query = query.OrderByDescending(c => c.Hotel.Rate);
        //            break;

        //        default:
        //            query = query.OrderBy(c => c.Hotel.Name);
        //            break;
        //    }

        //    int count = query.Count();

        //    var result =query.Select(u => new TourListViewModel
        //        {
        //            Id = u.Id,
        //            СityDeparture = "Київ",
        //            Name = u.Hotel.Name,
        //            Region = u.Hotel.Region.Name,
        //            Country = u.Hotel.Region.Country.Name,
        //            Description = u.Hotel.Description,
        //            Price = u.Price * u.DaysCount,
        //            Rate = u.Hotel.Rate,
        //            Class = u.Hotel.Class,
        //            FromData = u.FromData,
        //            Date = u.FromData.ToString().Substring(0, 10),
        //            DaysCount = u.DaysCount,
        //            ImagePath = url + "/1200_" + u.Hotel.HotelImages.FirstOrDefault(
        //                f => f.HotelId == u.HotelId).HotelImageUrl,
        //        })
        //        .Skip(pageNo * pageSize)
        //        .Take(pageSize).ToList();

        //    model.Tours = result;
        //    model.sortOrder = parameters.sortOrder;

        //    model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
        //    model.CurrentPage = page;
        //    return Ok(model);
        //}



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