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
                    Id=(++countryId).ToString(),
                    Name="Poland",
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Russia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(), //3
                    Name="Germany"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Ukraine"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="USA"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//6
                    Name="UK"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Australia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Belgium"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Bosnia and Herzegovina"//9
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Canada"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Chile"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//12
                    Name="China"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Croatia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Czech Republic"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//15
                    Name="Denmark"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//16
                    Name="Egypt"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Estonia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//18
                    Name="Finland"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="France"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Greece"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//21
                    Name="Iceland"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Ireland"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Israel"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//24
                    Name="Italy"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Japan"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Kazakhstan"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//27
                    Name="Latvia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Moldova"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Netherlands"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),//30
                    Name="Slovakia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Slovenia"
                },
                new Countries
                {
                    Id=(++countryId).ToString(),
                    Name="Spain"
                }
            };
            builder.HasData(countries);
        }
    }
}
