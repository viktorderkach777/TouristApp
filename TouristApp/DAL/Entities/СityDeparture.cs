using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class CityDeparture
    {
        public CityDeparture()
        {
            Tours = new HashSet<Tour>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Tour> Tours { get; set; }
    }
}
