﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TouristApp.DAL.Entities
{
    public class Region
    {
        public Region()
        {
            Hotels = new HashSet<Hotel>();
        }

        public long Id { get; set; }
        public long CountryId { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<Hotel> Hotels { get; set; }
    }
}
