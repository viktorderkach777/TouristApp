using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class Countries
    {
        public Countries()
        {
            Regions = new HashSet<Regions>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Regions> Regions { get; set; }
    }
}
