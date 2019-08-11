using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyCalculation.DAL.Entities;

namespace MyCalculation.DAL.Configuration.InitialDataConfiguration
{
    class RegionInitialConfig : IEntityTypeConfiguration<Regions>
    {
        public void Configure(EntityTypeBuilder<Regions> builder)
        {
            int cityId = 0;
            Regions[] regiones = new Regions[]
            {
                 new Regions
                 {
                     Id=(++cityId).ToString(),
                     CountryId="16",
                     Name="Шарм Эль Шейх"
                 },
                 new Regions
                 {
                     Id=(++cityId).ToString(),
                     CountryId="1",
                     Name="Krakow"
                 },
                 new Regions
                 {
                     Id=(++cityId).ToString(),
                     CountryId="1",
                     Name="Wroclaw"
                 }
            };
            builder.HasData(regiones);
        }
    }
}
