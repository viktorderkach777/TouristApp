using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class Tours
    {
        public Tours()
        {
            Orders = new HashSet<Orders>();
        }

        public long Id { get; set; }
        public long HotelId { get; set; }
        public decimal? Price { get; set; }
        public int? DaysCount { get; set; }
        public DateTime? FromData { get; set; }
        public long CityDepartureId { get; set; }

        public virtual CityDepartures CityDeparture { get; set; }
        public virtual Hotels Hotel { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }

        public virtual ICollection<Filter> Filtres { get; set; }
    }
}
