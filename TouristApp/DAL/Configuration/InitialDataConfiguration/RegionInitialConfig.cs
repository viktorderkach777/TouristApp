using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    class RegionInitialConfig : IEntityTypeConfiguration<Region>
    {
        public void Configure(EntityTypeBuilder<Region> builder)
        {
            int cityId = 0;
            Region[] regiones = new Region[]
            {
                 new Region
                 {
                     Id=(++cityId),
                     CountryId=16,
                     Name="Шарм Эль Шейх"
                 },
                 new Region
                 {
                     Id=(++cityId),
                     CountryId=1,
                     Name="Krakow"
                 },
                 new Region
                 {
                     Id=(++cityId),
                     CountryId=1,
                     Name="Wroclaw"
                 }
            };
            builder.HasData(regiones);
        }
    }
}
