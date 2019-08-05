using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCalculation.DAL.Entities
{
    public class HotelImages
    {
        public string Id { get; set; }
        public string HotelId { get; set; }
        public string HotelImageUrl { get; set; }

        public virtual Hotels Hotel { get; set; }
    }
}
