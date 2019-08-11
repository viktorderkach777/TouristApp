using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace TouristApp.DAL.Entities
{
    public class Comments
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string HotelId { get; set; }
        public DateTime CreatingDate { get; set; }
        public string Message { get; set; }

        //public virtual Hotels Hotel { get; set; }
        public virtual DbUser User { get; set; }
    }
}
