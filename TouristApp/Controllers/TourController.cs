﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TouristApp.DAL.Entities;
using TouristApp.Helpers;
using TouristApp.ViewModels;

namespace TouristApp.Controllers
{
    
    [Produces("application/json")]
    [Route("api/tour")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly IConfiguration _configuration;
        const string IMAGES_PATH = "ImagesPath";
        private readonly string _url;

        public TourController(EFContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _url = _configuration.GetValue<string>(IMAGES_PATH);
        }


        // GET: api/Tour/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTours([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tour = await _context.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound();
            }

            return Ok(tour);
        }

        // PUT: api/Tour/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTours([FromRoute] long id, [FromBody] Tour tour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tour.Id)
            {
                return BadRequest();
            }

            _context.Entry(tour).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TourExists(id))
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
        //[HttpPost("create")]
        //public async Task<IActionResult> Post([FromBody] TourAddViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    _context.Tours.Add(new Tour
        //    {
        //        HotelId = model.HotelId,
        //        //CityDepartureId=model.CityDepartureId,
        //        DaysCount = model.DaysCount,
        //        Price = model.Price * model.DaysCount,
        //        FromData = model.FromData
        //    });

        //    await _context.SaveChangesAsync();
        //    return Ok(model);
        //}

        [HttpGet("filters")]
        public List<FNameViewModel> GetFilters()
        {
            var result = GetListFilters(_context);

            return result;
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
                            FValueId = aEmp != null ? aEmp.FilterValueId : 0,
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
                                             Value = v.FValue
                                         } into g
                                         select g.Key)
                                         .OrderBy(l => l.Value).ToList()
                         };

            return result.ToList();
        }

        // version 2
        [HttpPost("list2")]
        public async Task<ActionResult<ToursViewModel>> Post2([FromBody] ToursListViewModel parameters)
        {
            var filtersList = GetListFilters(_context); // list існуючих фільтрів
            long[] filterValueSearchList = parameters.Filters; //масив ID вибраних фільтрів
            var url = _configuration.GetValue<string>("ImagesHotelUrl");

            int page = parameters.CurrentPage;
            int pageSize = 4;
            int pageNo = page - 1;
            ToursViewModel model = new ToursViewModel();

            var query = _context
                .Tours
                .Include(s => s.RoomType)
                .Include(s => s.RoomType.Hotel)
                    //.ThenInclude(hotel => hotel.Name)
                .Include(d => d.RoomType.Hotel.Region)
                    //.ThenInclude(region => region.Name)
                .Include(f => f.RoomType.Hotel.Region.Country)
                    //.ThenInclude(country => country.Name)
                .Include(s => s.RoomType.Hotel.HotelImages)
                .Include(z => z.CityDeparture)
                    //.ThenInclude(city => city.Name)
                .Include(t => t.Filtres)
                .AsQueryable();

            if (parameters.Filters.Length != 0)
            {
                foreach (var fName in filtersList)
                {
                    int countFilter = 0; //Кількість співпадінь у даній групі фільтрів
                    var predicate = PredicateBuilder.False<Tour>();
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
                                countFilter++;
                            }
                        }
                    }
                    if (countFilter != 0)
                        query = query.Where(predicate);
                }
            }

            if (!String.IsNullOrEmpty(parameters.SearchString))
            {
                query = query.Where(s => s.RoomType.Hotel.Name.Contains(parameters.SearchString)
                                       || s.RoomType.Hotel.Region.Name.Contains(parameters.SearchString));
            }

            switch (parameters.SortOrder)
            {
                case "name":
                    query = query.OrderBy(c => c.RoomType.Hotel.Name);
                    break;
                case "name_desc":
                    query = query.OrderByDescending(c => c.RoomType.Hotel.Name);
                    break;

                case "rate":
                    query = query.OrderBy(c => c.RoomType.Hotel.Rate);
                    break;
                case "rate_desc":
                    query = query.OrderByDescending(c => c.RoomType.Hotel.Rate);
                    break;

                default:
                    query = query.OrderBy(c => c.RoomType.Hotel.Name);
                    break;
            }

            int count = query.Count();

            var result = await query.Select(u => new TourListViewModel
            {

                Id = u.Id,
                СityDeparture = u.CityDeparture.Name,
                Name = u.RoomType.Hotel.Name,
                HotelNormalizedName = u.RoomType.Hotel.NormalizedName,
                Region = u.RoomType.Hotel.Region.Name,
                Country = u.RoomType.Hotel.Region.Country.Name,
                CountryNormalizedName = u.RoomType.Hotel.Region.Country.NormalizedName,
                Description = u.RoomType.Hotel.Description,
                Price = u.Price,
                Rate = u.RoomType.Hotel.Rate,
                Class = u.RoomType.Hotel.Class,
                HotelFood = u.RoomType.Hotel.HotelFood.Name,
                FromData = u.FromData,
                Date = u.FromData.ToString(),
                DaysCount = u.DaysCount,
                Discount=u.Discount,
                DiscountPrice=u.DiscountPrice,
                PlaceCount=u.RoomType.PlacesCount,
                ImagePath = u.RoomType.Hotel.HotelImages.FirstOrDefault(f => f.HotelId == u.RoomType.HotelId) == null
                            ? Path.Combine(_url, "no-photo.jpg")
                            : Path.Combine(_url, u.RoomType.Hotel.NormalizedName, "1200_" + u.RoomType.Hotel.HotelImages.FirstOrDefault(
                            f => f.HotelId == u.RoomType.HotelId).HotelImageUrl)
            })
                .Skip(pageNo * pageSize)
                .Take(pageSize).ToListAsync();

            model.Tours = result;
            model.TotalPages = (int)Math.Ceiling((double)count / pageSize);
            model.CurrentPage = page;
            model.CountItem = count;
            return Ok(model);
        }


        //[HttpGet("images/{id}")]
        //public async Task<IEnumerable<ImageItemViewModelNext>> Images(long id)
        //{
        //    //var hotel = await _context
        //    //            .Hotels
        //    //            .Include(s => s.Tours)
        //    //            .Where(s => s.Tours.FirstOrDefault(t => t.Id == id).HotelId == s.Id)
        //    //            .SingleOrDefaultAsync();

        //    var hotel = await _context
        //               .Hotels
        //                .Include(s => s.RoomTypes)
        //               .Include(s => s.RoomTypes.Tours)
        //               .Where(s => s.Tours.FirstOrDefault(t => t.Id == id). == s.Id)
        //               .SingleOrDefaultAsync();

        //    if (hotel != null)
        //    {
        //        var images = await _context.HotelImages.Where(
        //       f => f.HotelId == hotel.Id).Select(x => new ImageItemViewModelNext
        //       {
        //           Id = x.Id,
        //           Original = Path.Combine(_url, hotel.NormalizedName, "1200_" + x.HotelImageUrl),
        //           Thumbnail = Path.Combine(_url, hotel.NormalizedName, "268_" + x.HotelImageUrl)
        //       }).ToListAsync();

        //        return images;
        //    }           

        //    return new List<ImageItemViewModelNext>
        //    {
        //        new ImageItemViewModelNext
        //        {
        //            Id = 0,
        //            Original = Path.Combine(_url, "no-photo.jpg"),
        //            Thumbnail = Path.Combine(_url, "no-photo.jpg"),
        //        }
        //    }; 
        //}

    [HttpGet("single/{id}")]
        public async Task<ActionResult<SingleTourViewModel>> Get([FromRoute] long id)
        {
            var tour = await _context
                .Tours
                .Where(a => a.Id == id)
                .Include(s=>s.RoomType)
                .Include(s => s.RoomType.Hotel)
                .Include(s => s.RoomType.Hotel.Parameters)
                .Include(s => s.RoomType.Hotel.HotelImages)
                .Include(d => d.RoomType.Hotel.Region)
                .Include(d => d.RoomType.Hotel.HotelFood)
                .Include(f => f.RoomType.Hotel.Region.Country)
                .Include(z => z.CityDeparture)
                .Select(u => new SingleTourViewModel
                {
                    Id = u.Id,
                    СityDeparture = u.CityDeparture.Name,
                    Name = u.RoomType.Hotel.Name,
                    Region = u.RoomType.Hotel.Region.Name,
                    Country = u.RoomType.Hotel.Region.Country.Name,
                    Description = u.RoomType.Hotel.Description,
                    Price = u.Price,
                    Rate = u.RoomType.Hotel.Rate,
                    Class = u.RoomType.Hotel.Class,
                    FromData = u.FromData,
                    Date = u.FromData.ToString(),
                    DaysCount = u.DaysCount,
                    HotelFood = u.RoomType.Hotel.HotelFood.Name,
                    RoomType = u.RoomType.Name,
                    RoomDescription=u.RoomType.Description,
                    RoomsNumber=u.RoomType.RoomsCount,
                    TotalArea=u.RoomType.TotalArea,
                    Discount = u.Discount,
                    DiscountPrice = u.DiscountPrice,
                    PlaceCount = u.RoomType.PlacesCount,
                    Images = u.RoomType.Hotel.HotelImages.Where(
                        f => f.HotelId == u.RoomType.HotelId).Select(x => new HotelPhotoViewModel
                        {
                            Id = x.Id,
                            Original = Path.Combine(_url, u.RoomType.Hotel.NormalizedName, "1200_" + x.HotelImageUrl),
                            Thumbnail = Path.Combine(_url, u.RoomType.Hotel.NormalizedName, "268_" + x.HotelImageUrl),
                        }).ToList(),
                    HotelParametries = u.RoomType.Hotel.Parameters
                        .Where(x => x.ParentId == null && x.HotelId == u.RoomType.HotelId)
                        .OrderBy(z => z.Priority)
                        .Select(pr => new ParametersViewModel
                        {
                            Name = pr.Name,
                            Description = pr.Description,
                            Priority = pr.Priority,
                            Children = pr.Children.Select(f => new ParametersViewModel
                            {
                                Name = f.Name,
                                Description = f.Description,
                                Priority = f.Priority
                            }).ToList()
                        }).ToList()
                }).SingleAsync();

            if (tour.Images.Count == 0)
            {
                tour.Images.Add(new HotelPhotoViewModel
                {
                    Id = 0,
                    Original = Path.Combine(_url, "no-photo.jpg"),
                    Thumbnail = Path.Combine(_url, "no-photo.jpg"),
                });
            }


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

            var tour = await _context.Tours.FindAsync(id);
            if (tour == null)
            {
                return NotFound();
            }

            _context.Tours.Remove(tour);
            await _context.SaveChangesAsync();

            return Ok(tour.Id);
        }

        private bool TourExists(long id)
        {
            return _context.Tours.Any(e => e.Id == id);
        }
    }
}