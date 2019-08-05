using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCalculation.DAL.Entities
{
    public class Regions
    {
        public Regions()
        {
            Hotels = new HashSet<Hotels>();
        }

        public string Id { get; set; }
        public string CountryId { get; set; }
        public string Name { get; set; }

        public virtual Countries Country { get; set; }
        public virtual ICollection<Hotels> Hotels { get; set; }
    }
}
