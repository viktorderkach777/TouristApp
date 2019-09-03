using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    public class СityDepartureConfig : IEntityTypeConfiguration<СityDeparture>
    {
        public void Configure(EntityTypeBuilder<СityDeparture> builder)
        {
            int cityId = 0;
            СityDeparture[] cities = new СityDeparture[]
            {
                new СityDeparture
                {
                    Id=(++cityId).ToString(),
                    Name="Київ",
                },
                new СityDeparture
                {
                    Id=(++cityId).ToString(),
                    Name="Львов"
                },
                new СityDeparture
                {
                    Id=(++cityId).ToString(), //3
                    Name="Одеса"
                }
            };
        }
    }
}
