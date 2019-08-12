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
               
        public string RegionId { get; set; }

        public double? Rate { get; set; }

        public decimal? Price { get; set; }


    }
}
