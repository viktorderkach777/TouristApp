using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    public class CountryInitialConfig : IEntityTypeConfiguration<Country>
    {
        public void Configure(EntityTypeBuilder<Country> builder)
        {
            int countryId = 0;
            Country[] Country = new Country[]
            {
                new Country
                {
                    Id=(++countryId),
                    Name="Poland",
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Russia"
                },
                new Country
                {
                    Id=(++countryId), //3
                    Name="Germany"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Ukraine"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="USA"
                },
                new Country
                {
                    Id=(++countryId),//6
                    Name="UK"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Australia"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Belgium"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Bosnia and Herzegovina"//9
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Canada"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Chile"
                },
                new Country
                {
                    Id=(++countryId),//12
                    Name="China"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Croatia"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Czech Republic"
                },
                new Country
                {
                    Id=(++countryId),//15
                    Name="Denmark"
                },
                new Country
                {
                    Id=(++countryId),//16
                    Name="Egypt"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Estonia"
                },
                new Country
                {
                    Id=(++countryId),//18
                    Name="Finland"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="France"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Greece"
                },
                new Country
                {
                    Id=(++countryId),//21
                    Name="Iceland"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Ireland"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Israel"
                },
                new Country
                {
                    Id=(++countryId),//24
                    Name="Italy"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Japan"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Kazakhstan"
                },
                new Country
                {
                    Id=(++countryId),//27
                    Name="Latvia"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Moldova"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Netherlands"
                },
                new Country
                {
                    Id=(++countryId),//30
                    Name="Slovakia"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Slovenia"
                },
                new Country
                {
                    Id=(++countryId),
                    Name="Spain"
                }
            };
            builder.HasData(Country);
        }
    }
}
