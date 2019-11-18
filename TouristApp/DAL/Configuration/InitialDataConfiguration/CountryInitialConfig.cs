using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    public class CountryInitialConfig : IEntityTypeConfiguration<Countries>
    {
        public void Configure(EntityTypeBuilder<Countries> builder)
        {
            int countryId = 0;
            Countries[] countries = new Countries[]
            {
                new Countries
                {
                    Id=(++countryId),
                    Name="Poland",
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Russia"
                },
                new Countries
                {
                    Id=(++countryId), //3
                    Name="Germany"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Ukraine"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="USA"
                },
                new Countries
                {
                    Id=(++countryId),//6
                    Name="UK"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Australia"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Belgium"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Bosnia and Herzegovina"//9
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Canada"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Chile"
                },
                new Countries
                {
                    Id=(++countryId),//12
                    Name="China"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Croatia"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Czech Republic"
                },
                new Countries
                {
                    Id=(++countryId),//15
                    Name="Denmark"
                },
                new Countries
                {
                    Id=(++countryId),//16
                    Name="Egypt"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Estonia"
                },
                new Countries
                {
                    Id=(++countryId),//18
                    Name="Finland"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="France"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Greece"
                },
                new Countries
                {
                    Id=(++countryId),//21
                    Name="Iceland"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Ireland"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Israel"
                },
                new Countries
                {
                    Id=(++countryId),//24
                    Name="Italy"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Japan"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Kazakhstan"
                },
                new Countries
                {
                    Id=(++countryId),//27
                    Name="Latvia"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Moldova"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Netherlands"
                },
                new Countries
                {
                    Id=(++countryId),//30
                    Name="Slovakia"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Slovenia"
                },
                new Countries
                {
                    Id=(++countryId),
                    Name="Spain"
                }
            };
            builder.HasData(countries);
        }
    }
}
