using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
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

    public class ImageItemViewModelNext
    {
        public int Id { get; set; }
        public string original { get; set; }
        public string thumbnail { get; set; }
    }

    public class ImageItemViewModelNext2
    {
        public string Id { get; set; }
        public string original { get; set; }
        public string thumbnail { get; set; }
    }


    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IConfiguration _configuration;
        public SampleDataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //private static string[] Summaries = new[]
        //{
        //    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        //};

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

        [HttpGet("images2")]
        public IEnumerable<ImageItemViewModelNext> Images2()
        {
            var serverUrl = "http://localhost:44318/";
            var url = _configuration.GetValue<string>("ImagesUrl");
            List<string> imageNames = new List<string>
            {
                "1", "2", "3", "4"
            };
            var model = imageNames
                .Select(x => new ImageItemViewModelNext
                {
                    Id = int.Parse(x),
                    original = $"{serverUrl}{url}/1200_{x}.jpg",
                    thumbnail = $"{serverUrl}{url}/268_{x}.jpg"
                }).ToList();
            return model;
        }


        [HttpGet("weather/{region}")]       
        public async Task<IActionResult> Weather(string region)
        {
            WebRequest request;
            WebResponse response;
            string data = "";
            string _apiBase = "https://api.openweathermap.org/data/2.5/forecast";
            string getData = "";

            //string st = "coords-50.6196-26.2513"; //lat: 55.7507, lon: 37.6177

            if (region.StartsWith("coords-"))
            {
                String[] breakApart = region.Split('-');

                if (breakApart.Length > 2)
                {
                    string latitude = breakApart[1];
                    string longitude = breakApart[2];
                   
                    getData = $"{_apiBase}?lat={latitude}&lon={longitude}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";                   
                }
                else
                {
                    return BadRequest(new { invalid = "invalid coordinates" });
                }
            }
            else
            {
                getData = $"{_apiBase}?q={region}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";
            }         
           

           // string getDataByCity = "https://api.openweathermap.org/data/2.5/forecast?q=Rivne&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

            request = WebRequest.Create(getData);
            response = await request.GetResponseAsync();
           
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    data = reader.ReadToEnd();                    
                }
            }
            response.Close();

            return Ok(new{data });
        }


        [HttpGet("kurs/{date}")]
        public async Task<IActionResult> Kurs(string date)
        {
            WebRequest request;
            WebResponse response;
            string data = "";
            string _apiBase = "https://api.privatbank.ua/p24api/exchange_rates?json&date=";
            string getData = _apiBase+date;

            request = WebRequest.Create(getData);
            response = await request.GetResponseAsync();

            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    data = reader.ReadToEnd();
                }
            }
            response.Close();

            return Ok(new { data });
        }


        //[HttpGet("[action]")]

        //public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        //{
        //    var rng = new Random();

        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    });
        //}

        //public class WeatherForecast
        //{
        //    public string DateFormatted { get; set; }

        //    public int TemperatureC { get; set; }

        //    public string Summary { get; set; }

        //    public int TemperatureF
        //    {
        //        get
        //        {
        //            return 32 + (int)(TemperatureC / 0.5556);
        //        }
        //    }
        //}
    }
}
