using System;


namespace TouristApp.DAL.Entities
{
    public class Comments
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long HotelId { get; set; }
        public DateTime CreatingDate { get; set; }
        public string Message { get; set; }        
        public virtual DbUser User { get; set; }
    }
}
