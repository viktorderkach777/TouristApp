using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.ViewModels
{
    public class HotelListViewModel
    {

        public string Id { get; set; }

        public int Class { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int RoomsCount { get; set; }

        public string Region { get; set; }

        public string Country { get; set; }

        public string СityDeparture { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }

        public DateTime? FromData { get; set; }
        public string Date { get; set; }

        public int? DaysCount { get; set; }

    }

    public class ToursViewModel
    {
        public IEnumerable<HotelListViewModel> Tours { get; set; }
        public int TotalPage { get; set; }
        public int CurrentPage { get; set; }
        //public SearchCountryViewModel Search { get; set; }

    }
}