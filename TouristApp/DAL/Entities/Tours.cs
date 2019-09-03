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

        public string Id { get; set; }
        public string HotelId { get; set; }
        public string СityDepartureId { get; set; }
        public decimal? Price { get; set; }
        public int? DaysCount { get; set; }
        public DateTime? FromData { get; set; }
        
        public virtual Hotels Hotel { get; set; }
        public virtual СityDeparture СityDeparture { get; set; }
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
