using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace TouristApp.DAL.Entities
{
    public class Country
    {
        public Country()
        {
            Regions = new HashSet<Region>();
        }

        public long Id { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string NormalizedName { get; set; }
        public virtual ICollection<Region> Regions { get; set; }
    }
}
