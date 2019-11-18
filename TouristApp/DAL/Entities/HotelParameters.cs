using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class HotelParameters
    {
        public HotelParameters()
        {
            HotelSubParameters = new HashSet<HotelSubParameters>();
        }

        public long Id { get; set; }
        public long HotelId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual Hotels Hotel { get; set; }
        public virtual ICollection<HotelSubParameters> HotelSubParameters { get; set; }
    }
}
