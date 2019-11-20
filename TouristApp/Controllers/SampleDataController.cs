using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


namespace TouristApp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly IConfiguration _configuration;
        public SampleDataController(IConfiguration configuration)
        {
            _configuration = configuration;
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
            var answer = "";
            string _apiBase = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
            string getData = _apiBase;

            request = WebRequest.Create(getData);
            response = await request.GetResponseAsync();

            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    answer = reader.ReadToEnd();
                }
            }
            response.Close();
           
            return Ok(new { answer });            
        }      
    }
}
