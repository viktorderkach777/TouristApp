using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace TouristApp.DAL.Entities
{
    //public class СityDeparture
    //{
    //    public string Id { get; set; }
    //    public string Name { get; set; }
    //}

    public class CityDepartures
    {
        public CityDepartures()
        {
            Tours = new HashSet<Tours>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Tours> Tours { get; set; }
    }
}
