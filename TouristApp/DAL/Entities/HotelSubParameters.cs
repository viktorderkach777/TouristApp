using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class HotelSubParameters
    {
        public long Id { get; set; }
        public long HotelParameterId { get; set; }
        public string Name { get; set; }
        public bool? IsFree { get; set; }
        public virtual HotelParameters HotelParameter { get; set; }
    }
}
