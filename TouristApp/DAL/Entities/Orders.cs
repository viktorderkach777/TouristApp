using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class Orders
    {
        public long Id { get; set; }
        public long TourId { get; set; }
        public long UserId { get; set; }

        public virtual Tours Tour { get; set; }
        public virtual DbUser User { get; set; }
    }
}
