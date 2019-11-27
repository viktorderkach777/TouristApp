using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristApp.DAL.Entities
{
    [Table("tblParameters")]
    public class Parameter
    {
        [Key]
        public long Id { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; }

        [Required, StringLength(2000)]
        public string Description { get; set; }

        public int Priority { get; set; }

        [ForeignKey("Parent")]
        public long? ParentId { get; set; }
        public virtual Parameter Parent { get; set; }
        public virtual ICollection<Parameter> Children { get; set; }

        public long HotelId { get; set; }
        public virtual Hotel Hotel { get; set; }
    }
}
