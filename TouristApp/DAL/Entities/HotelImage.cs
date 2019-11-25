
namespace TouristApp.DAL.Entities
{
    public class HotelImage
    {
        public long Id { get; set; }
        public long HotelId { get; set; }
        public string HotelImageUrl { get; set; }
        public virtual Hotel Hotel { get; set; }
    }
}
