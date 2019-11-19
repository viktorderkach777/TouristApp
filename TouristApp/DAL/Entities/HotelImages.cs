
namespace TouristApp.DAL.Entities
{
    public class HotelImages
    {
        public long Id { get; set; }
        public long HotelId { get; set; }
        public string HotelImageUrl { get; set; }
        public virtual Hotels Hotel { get; set; }
    }
}
