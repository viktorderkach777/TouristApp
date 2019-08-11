using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class Hotels
    {
        public Hotels()
        {
            Comments = new HashSet<Comments>();
            HotelImages = new HashSet<HotelImages>();
            HotelParameters = new HashSet<HotelParameters>();
            Tours = new HashSet<Tours>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string RegionId { get; set; }
        public double? Rate { get; set; }
        public decimal? Price { get; set; }
        public int? RoomsCount { get; set; }

        public virtual Regions Region { get; set; }
        public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<HotelImages> HotelImages { get; set; }
        public virtual ICollection<HotelParameters> HotelParameters { get; set; }
        public virtual ICollection<Tours> Tours { get; set; }
    }
}
