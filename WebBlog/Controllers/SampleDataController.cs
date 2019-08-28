using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace TouristApp.Controllers
{
    public class ImageItemViewModel
    {
        public int Id { get; set; }
        public string BigImage { get; set; }
        public string SmallImage { get; set; }
    }

    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IConfiguration _configuration;
        public SampleDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

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

        [HttpGet("[action]")]
        
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }

            public int TemperatureC { get; set; }

            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
