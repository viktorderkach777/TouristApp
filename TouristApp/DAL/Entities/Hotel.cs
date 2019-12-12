using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TouristApp.DAL.Entities
{
    public class Hotel
    {
        public Hotel()
        {
            Comments= new HashSet<Comment>();
            HotelImages = new HashSet<HotelImage>();           
            Tours = new HashSet<Tour>();
            RoomTypes = new HashSet<RoomType>();
        }

        public long Id { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string NormalizedName { get; set; }

        [Required, StringLength(maximumLength: 1000)]
        public string Description { get; set; }
        public long RegionId { get; set; }
        public double? Rate { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal? Price { get; set; }
        public int? RoomsCount { get; set; }

        [Required]
        public int Class { get; set; }
        public double? Longtitude { get; set; }
        public double? Latitude { get; set; }
        public long HotelFoodId { get; set; }
        public virtual Region Region { get; set; }       
        public virtual HotelFood HotelFood { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<HotelImage> HotelImages { get; set; }        
        public virtual ICollection<Parameter> Parameters { get; set; }
        public virtual ICollection<Tour> Tours { get; set; }
        public virtual ICollection<RoomType> RoomTypes { get; set; }
    }
}
