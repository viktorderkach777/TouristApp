using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class SeederDB
    {
        private static void SeedFilters(EFContext context)
        {
            #region tblFilterNames - Назви фільтрів
            string[] filterNames = { "Країни", "Город вильоту", "Клас готелю" };
            foreach (var type in filterNames)
            {
                if (context.FilterNames.SingleOrDefault(f => f.Name == type) == null)
                {
                    context.FilterNames.Add(
                        new Entities.FilterName
                        {
                            Name = type
                        });
                    context.SaveChanges();
                }
            }
            #endregion

            #region tblFilterValues - Значення фільтрів
            List<string[]> filterValues = new List<string[]> {
                new string [] { "Кіпр", "Єгипет", "Туніс","Іспанія"},
                new string [] { "Київ", "Львів", "Одеса"},
                new string [] {"2*","3*","4*","5*"}
            };
            //string t=filterNames[0];
            foreach (var items in filterValues)
            {
                foreach (var value in items)
                {
                    if (context.FilterValues
                        .SingleOrDefault(f => f.Name == value) == null)
                    {
                        context.FilterValues.Add(
                            new Entities.FilterValue
                            {
                                Name = value
                            });
                        context.SaveChanges();
                    }
                }
            }
            #endregion

            #region tblFilterNameGroups - Групування по групах фільтрів

            for (int i = 0; i < filterNames.Length; i++)
            {
                foreach (var value in filterValues[i])
                {
                    var nId = context.FilterNames
                        .SingleOrDefault(f => f.Name == filterNames[i]).Id;
                    var vId = context.FilterValues
                        .SingleOrDefault(f => f.Name == value).Id;
                    if (context.FilterNameGroups
                        .SingleOrDefault(f => f.FilterValueId == vId &&
                        f.FilterNameId == nId) == null)
                    {
                        context.FilterNameGroups.Add(
                            new Entities.FilterNameGroup
                            {
                                FilterNameId = nId,
                                FilterValueId = vId
                            });
                        context.SaveChanges();
                    }
                }
            }
            #endregion

            #region tblCars - Автомобілі
            //List<string> cars = new List<string>{
            // "154muv2f", "154m2fas"
            //};
            //foreach (var item in cars)
            //{
            //    if (context.Cars.SingleOrDefault(f => f.UniqueName == item) == null)
            //    {
            //        context.Cars.Add(
            //            new Car
            //            {
            //                UniqueName = item,
            //                Date = DateTime.Now,
            //                Price = 20000
            //            });
            //        context.SaveChanges();
            //    }
            //}
            #endregion
        //    #region tblFilters - Фільтри
        //    Filter[] filters =
        //    {
        //        new Filter { FilterNameId = "1", FilterValueId="1", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },
        //        new Filter { FilterNameId = "2", FilterValueId="1", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },
        //        new Filter { FilterNameId = "3", FilterValueId="3", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },

        //        new Filter { FilterNameId = "1", FilterValueId="1", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },
        //        new Filter { FilterNameId = "2", FilterValueId="2", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },
        //        new Filter { FilterNameId = "3", FilterValueId="3", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },

        //        new Filter { FilterNameId = "1", FilterValueId="1", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },
        //        new Filter { FilterNameId = "2", FilterValueId="2", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },
        //        new Filter { FilterNameId = "3", FilterValueId="3", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },

        //    };
        //    foreach (var item in filters)
        //    {
        //        context.Filters.Add(new Filter { FilterNameId = item.FilterNameId, FilterValueId = item.FilterValueId, TourId = item.TourId });
        //        context.SaveChanges();
        //    }
        //    #endregion
        }

        


            public static void SeedUsers(UserManager<DbUser> userManager,
           RoleManager<DbRole> roleManager)
        {
            var email = "admin@gmail.com";
            var roleName = "Admin";
            var findUser = userManager.FindByEmailAsync(email).Result;
            if (findUser == null)
            {
                var user = new DbUser
                {
                    FirstName = "Vasyl",
                    MiddleName = "Vasylyovych",
                    LastName = "Vasylyuk",
                    DateOfBirth = DateTime.Now,
                    AvatarUrl = "no_image.jpg",
                    Email = email,
                    UserName = email,
                    SignUpTime = DateTime.Now,
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;

                var roleresult = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName

                }).Result;

                result = userManager.AddToRoleAsync(user, roleName).Result;
            }

            
        }
        public static void SeedDataByAS(IServiceProvider services, IHostingEnvironment env,
            IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeederDB.SeedUsers(manager, managerRole);
                SeederDB.SeedFilters(context);
            }
        }
    }
}
