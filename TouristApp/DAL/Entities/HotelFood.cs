using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace TouristApp.DAL.Entities
{
    public class HotelFood
    {
        public HotelFood()
        {
            Hotels = new HashSet<Hotel>();
        }

        public long Id { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public virtual ICollection<Hotel> Hotels { get; set; } 
    }
}
