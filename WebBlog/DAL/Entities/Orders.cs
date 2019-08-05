using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCalculation.DAL.Entities
{
    public class Orders
    {
        public string Id { get; set; }
        public string TourId { get; set; }
        public string UserId { get; set; }

        public virtual Tours Tour { get; set; }
        public virtual DbUser User { get; set; }
    }
}
