using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class Region
    {
        public Region()
        {
            Hotels = new HashSet<Hotel>();
        }

        public long Id { get; set; }
        public long CountryId { get; set; }
        public string Name { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<Hotel> Hotels { get; set; }
    }
}
