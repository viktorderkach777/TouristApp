using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class CityDepartures
    {
        public CityDepartures()
        {
            Tours = new HashSet<Tours>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Tours> Tours { get; set; }
    }
}
