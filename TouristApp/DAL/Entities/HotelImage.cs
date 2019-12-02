
using System.ComponentModel.DataAnnotations;

namespace TouristApp.DAL.Entities
{
    public class HotelImage
    {
        public long Id { get; set; }
        public long HotelId { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string HotelImageUrl { get; set; }
        public virtual Hotel Hotel { get; set; }
    }
}
