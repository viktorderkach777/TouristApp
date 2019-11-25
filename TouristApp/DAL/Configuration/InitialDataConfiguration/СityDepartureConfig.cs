using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    public class СityDepartureConfig : IEntityTypeConfiguration<CityDeparture>
    {
        //public void Configure(EntityTypeBuilder<СityDepartures> builder)
        //{
        //    int cityId = 0;
        //    СityDepartures[] cities = new СityDepartures[]
        //    {
        //        new СityDepartures
        //        {
        //            Id=(++cityId).ToString(),
        //            Name="Київ",
        //        },
        //        new СityDepartures
        //        {
        //            Id=(++cityId).ToString(),
        //            Name="Львов"
        //        },
        //        new СityDepartures
        //        {
        //            Id=(++cityId).ToString(), //3
        //            Name="Одеса"
        //        }
        //    };
        //}
        public void Configure(EntityTypeBuilder<CityDeparture> builder)
        {
            int cityId = 0;
            CityDeparture[] cities = new CityDeparture[]
            {
                new CityDeparture
                {
                    Id=(++cityId),
                    Name="Київ",
                },
                new CityDeparture
                {
                    Id=(++cityId),
                    Name="Львiв"
                },
                new CityDeparture
                {
                    Id=(++cityId), //3
                    Name="Одеса"
                }
            };
        }
    }
}
