
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristApp.DAL.Entities
{
    public class RoomType
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double? TotalArea { get; set; }
        public int? RoomsCount { get; set; }
        public int PlacesCount { get; set; }
        public int? ExtraPlacesCount { get; set; }
        public string ExtraBedType { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Price { get; set; }

        public long HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}
