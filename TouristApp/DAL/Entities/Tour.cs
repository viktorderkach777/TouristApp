using System;
using System.Collections.Generic;
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

        public long HotelId { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal? Price { get; set; }

        public int? DaysCount { get; set; }

        public DateTime? FromData { get; set; }

        public long CityDepartureId { get; set; }

        public virtual CityDeparture CityDeparture { get; set; }

        public virtual Hotel Hotel { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<Filter> Filtres { get; set; }
    }
}
