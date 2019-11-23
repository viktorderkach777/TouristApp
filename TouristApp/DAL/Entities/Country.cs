using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class Country
    {
        public Country()
        {
            Regions = new HashSet<Region>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Region> Regions { get; set; }
    }
}
