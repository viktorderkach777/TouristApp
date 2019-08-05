using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyCalculation.DAL.Entities
{
    public class Countries
    {
        public Countries()
        {
            Regions = new HashSet<Regions>();
        }

        public string Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Regions> Regions { get; set; }
    }
}
