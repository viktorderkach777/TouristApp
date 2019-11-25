using System.Collections.Generic;


namespace TouristApp.DAL.Entities
{
    public class HotelParameter
    {
        public HotelParameter()
        {
            HotelSubParameters = new HashSet<HotelSubParameter>();
        }

        public long Id { get; set; }
        public long HotelId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual Hotel Hotel { get; set; }
        public virtual ICollection<HotelSubParameter> HotelSubParameters { get; set; }
    }
}
