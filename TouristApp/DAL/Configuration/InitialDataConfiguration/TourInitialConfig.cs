using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;


namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{


    class TourInitialConfig : IEntityTypeConfiguration<Tour>
    {
        public void Configure(EntityTypeBuilder<Tour> builder)
        {
            int tourId = 0;
            Tour[] tours = new Tour[]
            {
                 new Tour
                 {
                     Id=(++tourId),
                     HotelId=1,
                     DaysCount=6,
                     Price=3300,
                     FromData=new DateTime(1979, 07, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar) //DateTime.Now
                 },
                 new Tour
                 {
                     Id=(++tourId),
                     HotelId=2,
                     DaysCount=8,
                     Price=4400,
                     FromData=new DateTime(1979, 07, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 },
                 new Tour
                 {
                     Id=(++tourId),
                     HotelId=2,
                     DaysCount=10,
                     Price=5500,
                     FromData=new DateTime(1979, 07, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 }
                };
            builder.HasData(tours);
        }
    }
}
