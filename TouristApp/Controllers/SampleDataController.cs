using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TouristApp.Controllers
{
    public class ImageItemViewModel
    {
        public int Id { get; set; }
        public string BigImage { get; set; }
        public string SmallImage { get; set; }
    }

    public class KursModel
    {
        public string ccy { get; set; }
        public string base_ccy { get; set; }
        public string buy { get; set; }
        public string sale { get; set; }
    }

    public class KursListModel
    {
        public double RUR { get; set; }
        public double USD { get; set; }
        public double EUR { get; set; }
        
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
            string appid = _configuration.GetValue<string>("WheatherId");

            if (region.StartsWith("coords;"))
            {
                String[] breakApart = region.Split(';');

                if (breakApart.Length > 2)
                {
                    getData = $"{_apiBase}?lat={breakApart[1]}&lon={breakApart[2]}&units=metric&appid={appid}";
                }
                else
                {
                    return BadRequest(new { invalid = "invalid coordinates" });
                }
            }
            else
            {
                getData = $"{_apiBase}?q={region}&units=metric&appid={appid}";
            }

            request = WebRequest.Create(getData);

            try
            {
                response = await request.GetResponseAsync();
            }
            catch (Exception e)
            {
                string s = e.Message;               
                return BadRequest(new { invalid = s });
            }

            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    data = reader.ReadToEnd();
                }
            }
            response.Close();

            return Ok( new { data });
        }


        [HttpGet("kurs")]
        public async Task<IActionResult> Kurs()
        {
            WebRequest request;
            WebResponse response;
            var json = "";
            string _apiBase = " https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
            string getData = _apiBase;

            request = WebRequest.Create(getData);
            response = await request.GetResponseAsync();

            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    json = reader.ReadToEnd();
                }
            }
            response.Close();

            List<KursModel> kurses = JsonConvert.DeserializeObject<List<KursModel>>(json);

            var answer = new KursListModel
            {
                USD = Convert.ToDouble(kurses[0].buy),
                RUR = Convert.ToDouble(kurses[2].buy),
                EUR = Convert.ToDouble(kurses[1].buy),
               
            };

            return Ok(new { answer });
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
