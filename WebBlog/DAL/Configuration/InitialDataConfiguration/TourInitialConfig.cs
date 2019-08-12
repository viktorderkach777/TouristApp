using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;


namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
   

    class TourInitialConfig : IEntityTypeConfiguration<Tours>
    {
        public void Configure(EntityTypeBuilder<Tours> builder)
        {
            int tourId = 0;
            Tours[] hotels = new Tours[]
            {
                 new Tours
                 {
                     Id=(++tourId).ToString(),
                     HotelId="1",
                     DaysCount=6,
                     Price=3300,
                     FromData=DateTime.Now
                 },
                 new Tours
                 {
                     Id=(++tourId).ToString(),
                     HotelId="2",
                     DaysCount=8,
                     Price=4400,
                     FromData=DateTime.Now
                 },
                 new Tours
                 {
                     Id=(++tourId).ToString(),
                     HotelId="2",
                     DaysCount=10,
                     Price=5500,
                     FromData=DateTime.Now
                 }
                };
            builder.HasData(hotels);
        }
    }
}
