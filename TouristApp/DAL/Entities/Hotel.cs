using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace TouristApp.DAL.Entities
{
    public class Hotel
    {
        public Hotel()
        {
            Comments= new HashSet<Comment>();
            HotelImages = new HashSet<HotelImage>();
            HotelParameters = new HashSet<HotelParameter>();
            Tours = new HashSet<Tour>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string Description { get; set; }
        public long RegionId { get; set; }
        public double? Rate { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal? Price { get; set; }
        public int? RoomsCount { get; set; }
        public int Class { get; set; }
        public double? Longtitude { get; set; }
        public double? Latitude { get; set; }
        public virtual Region Region { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<HotelImage> HotelImages { get; set; }
        public virtual ICollection<HotelParameter> HotelParameters { get; set; }
        public virtual ICollection<Parameter> Parameters { get; set; }
        public virtual ICollection<Tour> Tours { get; set; }
    }
}
