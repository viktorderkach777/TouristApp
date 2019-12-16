using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TouristApp.DAL.Entities
{
    public class Tour
    {
        public Tour()
        {
            Orders = new HashSet<Order>();
        }

        public long Id { get; set; }
       
        public long RoomTypeId { get; set; }

        [Column(TypeName = "decimal(7,2)")]
        public decimal? Price { get; set; }

        public int? DaysCount { get; set; }

        public DateTime? FromData { get; set; }

        [Range(0, 100, ErrorMessage = "Недопустима знижка")]
        public double Discount { get; set; }

        [Column(TypeName = "decimal(7,2)")]
        public decimal? DiscountPrice { get; set; }

        public long CityDepartureId { get; set; }

        public virtual CityDeparture CityDeparture { get; set; }
       
        public virtual RoomType RoomType { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<Filter> Filtres { get; set; }
    }
}
