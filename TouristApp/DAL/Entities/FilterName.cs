﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristApp.DAL.Entities
{
    [Table("tblFilterNames")]
    public class FilterName
    {
        [Key]
        public string Id { get; set; }

        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public virtual ICollection<Filter> Filtres { get; set; }
        public virtual ICollection<FilterNameGroup> FilterNameGroups { get; set; }
    }
}