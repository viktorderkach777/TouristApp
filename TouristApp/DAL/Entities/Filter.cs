using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TouristApp.DAL.Entities
{
    [Table("tblFilters")]
    public class Filter
    {
        [ForeignKey("FilterNameOf"), Key, Column(Order = 0)]
        public long FilterNameId { get; set; }
        public virtual FilterName FilterNameOf { get; set; }

        [ForeignKey("FilterValueOf"), Key, Column(Order = 1)]
        public long FilterValueId { get; set; }
        public virtual FilterValue FilterValueOf { get; set; }

        [ForeignKey("TourOf"), Key, Column(Order = 2)]
        public long TourId { get; set; }
        public virtual Tours TourOf { get; set; }
    }
}
