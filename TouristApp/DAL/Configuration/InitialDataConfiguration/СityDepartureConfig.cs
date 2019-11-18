using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    public class СityDepartureConfig : IEntityTypeConfiguration<CityDepartures>
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
        public void Configure(EntityTypeBuilder<CityDepartures> builder)
        {
            int cityId = 0;
            CityDepartures[] cities = new CityDepartures[]
            {
                new CityDepartures
                {
                    Id=(++cityId),
                    Name="Київ",
                },
                new CityDepartures
                {
                    Id=(++cityId),
                    Name="Львiв"
                },
                new CityDepartures
                {
                    Id=(++cityId), //3
                    Name="Одеса"
                }
            };
        }
    }
}
