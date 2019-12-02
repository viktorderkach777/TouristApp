using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristApp.DAL.Entities
{
    public class CityDeparture
    {
        public CityDeparture()
        {
            Tours = new HashSet<Tour>();
        }

        public long Id { get; set; }

        [Required, StringLength(maximumLength: 128)]
        public string Name { get; set; }

        public virtual ICollection<Tour> Tours { get; set; }
    }
}
