
namespace TouristApp.DAL.Entities
{
    public class  Order
    {
        public long Id { get; set; }
        public long TourId { get; set; }
        public long UserId { get; set; }

        public virtual Tour Tour { get; set; }
        public virtual DbUser User { get; set; }
    }
}
