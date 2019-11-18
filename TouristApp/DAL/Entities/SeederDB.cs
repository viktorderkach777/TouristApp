﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace TouristApp.DAL.Entities
{
    public class SeederDB
    {
        private static void SeedFilters(EFContext context)
        {
            #region tblFilterNames - Назви фільтрів
            string[] filterNames = { "Країни", "Місто вильоту", "Клас готелю" };
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
                new string [] { "Турція", "Єгипет", "ОАЕ", "Греція", "Іспанія", "Кіпр", "Туніс", "Таїланд", "Шрі Ланка", "Болгарія"},
                new string [] { "Київ", "Львів", "Одеса"},
                new string [] {"2*", "3*", "4*", "5*"}
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
            
            List<Filter> fils = new List<Filter>(); 
            foreach (var tour in context.Tours)
            {               
                CityDepartures city = context.CityDepartures.FirstOrDefault(c => c.Id == tour.CityDepartureId);
                var filvalCity = context.FilterValues.FirstOrDefault(f => f.Name == city.Name);

                Hotels hotel = context.Hotels.FirstOrDefault(h => h.Id == tour.HotelId);
                var filvalHotelClass = context.FilterValues.FirstOrDefault(f => f.Name == hotel.Class.ToString() + "*");

                Regions regions = context.Regions.FirstOrDefault(r => r.Id == hotel.RegionId);
                Countries country = context.Countries.FirstOrDefault(c => c.Id == regions.CountryId);
                var filvalHotelCountry = context.FilterValues.FirstOrDefault(f => f.Name == country.Name);

                Filter[] filts =
                {
                    new Filter { FilterNameId = 3, FilterValueId = filvalHotelClass.Id, TourId = tour.Id },  //клас готелю
                    new Filter { FilterNameId = 1, FilterValueId = filvalHotelCountry.Id, TourId = tour.Id },  // країна
                    new Filter { FilterNameId = 2, FilterValueId = filvalCity.Id, TourId = tour.Id } // місто вильоту
                };
                fils.AddRange(filts);
            }


            //    Filter[] filters =
            //{
            //        new Filter { FilterNameId = 3, FilterValueId=16, TourId=1 },  //клас готелю
            //        new Filter { FilterNameId = 1, FilterValueId=2, TourId=1 },  // країна
            //        new Filter { FilterNameId = 2, FilterValueId=11, TourId=1 },  // місто вильоту

            //        new Filter { FilterNameId = 3, FilterValueId=16, TourId=2 },
            //        new Filter { FilterNameId = 1, FilterValueId=2, TourId=2 },
            //        new Filter { FilterNameId = 2, FilterValueId=12, TourId=2 },

            //        new Filter { FilterNameId = 3, FilterValueId=16, TourId=3 },
            //        new Filter { FilterNameId = 1, FilterValueId=2, TourId=3 },
            //        new Filter { FilterNameId = 2, FilterValueId=13, TourId=3 },
            //};



            #region tblFilters - Фільтри
            //Filter[] filters =
            //{
            //        new Filter { FilterNameId = "1c57a39c-165f-459d-852e-8275b290520e", FilterValueId="daf3b4a5-b084-426f-9cc5-a219a861ad8d", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },  //клас готелю
            //        new Filter { FilterNameId = "b4b2c278-cbbd-4242-9e05-85db3ef47055", FilterValueId="3919924e-0493-4b02-9cf8-7c6b420f3ed2", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },  // країна
            //        new Filter { FilterNameId = "bd265235-e90e-4a6a-945f-2d379a5455f2", FilterValueId="1e62f01f-5461-45e2-934f-c545166b330b", TourId="42ba7a0a-3060-4cf2-b956-c6507961a423" },  // місто вильоту

            //        new Filter { FilterNameId = "1c57a39c-165f-459d-852e-8275b290520e", FilterValueId="daf3b4a5-b084-426f-9cc5-a219a861ad8d", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },
            //        new Filter { FilterNameId = "b4b2c278-cbbd-4242-9e05-85db3ef47055", FilterValueId="2a5a2de1-80c0-4303-a2b3-4c7d5a373cd8", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },
            //        new Filter { FilterNameId = "bd265235-e90e-4a6a-945f-2d379a5455f2", FilterValueId="1e62f01f-5461-45e2-934f-c545166b330b", TourId="a5a0c5ed-d53a-4534-a25a-ba60349af439" },

            //        new Filter { FilterNameId = "1c57a39c-165f-459d-852e-8275b290520e", FilterValueId="daf3b4a5-b084-426f-9cc5-a219a861ad8d", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },
            //        new Filter { FilterNameId = "b4b2c278-cbbd-4242-9e05-85db3ef47055", FilterValueId="3919924e-0493-4b02-9cf8-7c6b420f3ed2", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },
            //        new Filter { FilterNameId = "bd265235-e90e-4a6a-945f-2d379a5455f2", FilterValueId="1e62f01f-5461-45e2-934f-c545166b330b", TourId="f51b2ba2-4293-44a6-af37-63086811aa29" },

            //    };
            foreach (var item in fils)
            {
                if (context.Filters.FirstOrDefault(f => f.FilterNameId == item.FilterNameId && f.FilterValueId == item.FilterValueId && f.TourId == item.TourId) == null)
                {
                    context.Filters.Add(new Filter { FilterNameId = item.FilterNameId, FilterValueId = item.FilterValueId, TourId = item.TourId });
                    context.SaveChanges();
                }
            }
            #endregion
        }

        public static void SeedCountries(EFContext context)
        {
            string[] country_names = new string[]
            {
                "Австралія",
                "Австрія",
                "Азербайджан",
                "Албанія",
                "Андора",
                "Аргентина",
                "Арменія",
                "Аруба",
                "Багамскі Острови",
                "Бангладеш",
                "Барбадос",
                "Білорусь",
                "Бірма",
                "Бельгія",
                "Болгарія",
                "Болівія",
                "Боснія и Герцеговина",
                "Бразилія",
                "Бутан",
                "Великобританія",
                "Венгрія",
                "В'єтнам",
                "Гватемала",
                "Гондурас",
                "Гонконг",
                "Греція",
                "Грузія",
                "Данія",
                "Домінікана",
                "Іспанія",
                "Еквадор",
                "Естонія",
                "Єгипет",
                "Зімбабве",
                "Ізраїль",
                "Індонезія",
                "Індія",
                "Іорданія",
                "Іспанія",
                "Іран",
                "Ірландія",
                "Ісландія",
                "Італія",
                "Камбоджа",
                "Канада",
                "Катар",
                "Кенія",
                "Кіпр",
                "Китай",
                "Коста-Ріка",
                "Куба",
                "Кюрасао",
                "Лаос",
                "Латвія",
                "Литва",
                "Ліхтенштейн",
                "Люксембург",
                "Маврикій",
                "Мадагаскар",
                "Македонія",
                "Малайзія",
                "Мальдіви",
                "Мальта",
                "Марокко",
                "Мексика",
                "Молдова",
                "Монако",
                "Мьянма",
                "Непал",
                "Нідерланди",
                "Нікарагуа",
                "Німеччина",
                "Новая Зеландія",
                "Норвегія",
                "ОАЕ",
                "Оман",
                "ПАР",
                "Парагвай",
                "Південна Корея",
                "Перу",
                "Польша",
                "Португалія",
                "Росія",
                "Румунія",
                "Сан-Марино",
                "Сейшельскі о.",
                "Сен-Бартелемі",
                "Сен-Мартен",
                "Сербія",
                "Сінгапур",
                "Словакія",
                "Словенія",
                "США",
                "Таїланд",
                "Танзанія",
                "Турція",
                "Туніс",
                "Україна",
                "Филипіни",
                "Фінляндія",
                "Франція",
                "Французська Полінезія",
                "Хорватія",
                "Чехія",
                "Чорногогрія",
                "Чилі",
                "Швейцарія",
                "Швеція",
                "Шотландія",
                "Шрі Ланка",
                "Ямайка",
                "Японія"
            };

            foreach (var name in country_names)
            {
                if (context.Countries.FirstOrDefault(f => f.Name == name) == null)
                {
                    context.Countries.Add(new Countries { Name = name });
                    context.SaveChanges();
                }
            }
        }

        public static void SeedRegionsHelper(EFContext context, string countryName, string[] regions_names)
        {
            Countries country = context.Countries.FirstOrDefault(f => f.Name == countryName);

            if (country != null)
            {
                foreach (var name in regions_names)
                {
                    if (context.Regions.FirstOrDefault(f => f.Name == name && f.Country.Name == countryName) == null)
                    {
                        context.Regions.Add(new Regions { Name = name, CountryId = country.Id });
                        context.SaveChanges();
                    }
                }
            }
        }


        public static void SeedRegions(EFContext context)
        {
            SeederDB.SeedRegionsHelper(context, "Єгипет", new string[]
                {
                    "Дахаб",
                    "Марса Алам",
                    "Хургада",
                    "Шарм Ель Шейх",
                    "Ель Гуна",
                    "Макаді Бей",
                    "Сахл Хашиш",
                    "Таба",
                    "Сома Бей",
                    "Сафага",
                });

            SeederDB.SeedRegionsHelper(context, "Турція", new string[]
               {
                   "Стамбул",
                    "Аланія",
                    "Анталія",
                    "Кемер",
                    "Сіде",
                    "Бєлек",
                    "Мармаріс",
                    "Фетхіє",
                    "Кушадаси",
                    "Бодрум",
                    "Чешме"
               });

            SeederDB.SeedRegionsHelper(context, "ОАЕ", new string[]
              {
                   "Дубаї",
                    "Рас Аль Хайма",
                    "Фуджейра",
                    "Аджман",
                    "Абу Дабі",
                    "Шарджа",
                    "Умм Аль Кувейн"
              });

            SeederDB.SeedRegionsHelper(context, "Греція", new string[]
              {
                   "Крит",
                   "Афіни",
                   "Пелла",
                   "Корфу",
                   "Евбея",
                   "Тасос",
                   "Салоніки",
                   "Лутракі",
                   "Родос",
                   "Кассандра",
                   "Санторіні",
                   "Пієрія",
                   "Сітонія",
                   "Пелопоннес"
              });

            SeederDB.SeedRegionsHelper(context, "Іспанія", new string[]
             {
                   "Коста Дорада",
                   "Барселона",
                   "Коста Брава",
                   "Коста Бланка",
                   "Коста Дель Соль",
                   "Майорка",
                   "Тенеріфе",
                   "Ібіца"
             });

            SeederDB.SeedRegionsHelper(context, "Кіпр", new string[]
             {
                   "Айя Напа",
                   "Протарас",
                   "Пафос",
                   "Лімасол",
                   "Ларнака",
                   "Піссурі"
             });

            SeederDB.SeedRegionsHelper(context, "Туніс", new string[]
            {
                   "Хаммамет",
                   "Джерба",
                   "Набель",
                   "Сус",
                   "Махдія",
                   "Енфіда"
            });

            SeederDB.SeedRegionsHelper(context, "Таїланд", new string[]
            {
                   "Пхукет",
                   "Крабі",
                   "Бангкок",
                   "Паттайя",
                   "Ко Чанг",
                   "Хуа Хін"
            });

            SeederDB.SeedRegionsHelper(context, "Шрі Ланка", new string[]
           {
                   "Велігама",
                   "Негомбо",
                   "Маравіла",
                   "Тангалле",
                   "Трінкомалі",
                   "Пасікуда"
           });

            SeederDB.SeedRegionsHelper(context, "Болгарія", new string[]
          {
                   "Созополь",
                   "Бансько",
                   "Несебр",
                   "Балчик",
                   "Софія",
                   "Пловдив"
          });
        }

        public static void SeedCityDepartures(EFContext context)
        {
            string[] city_names = new string[]
            {
                "Київ",
                "Львів",
                "Одеса",
            };

            foreach (var name in city_names)
            {
                if (context.CityDepartures.FirstOrDefault(f => f.Name == name) == null)
                {
                    context.CityDepartures.Add(new CityDepartures { Name = name });
                    context.SaveChanges();
                }
            }
        }

        public static void SeedHotelsHelper(EFContext context, Regions region, Hotels[] hotels)
        {           
            if (region!= null)
            {
                foreach (var hotel in hotels)
                {
                    if (context.Hotels.FirstOrDefault(f => f.Name == hotel.Name && f.RegionId == region.Id) == null)
                    {
                        context.Hotels.Add(hotel);
                        context.SaveChanges();
                    }
                }
            }            
        }

        public static void SeedHotels(EFContext context)
        {
            //string countryName = "Єгипет";
            string regionName = "Марса Алам";
            Regions region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            SeederDB.SeedHotelsHelper(context, region, new Hotels[]
                {
                    new Hotels
                    {
                         Class=5,
                         RegionId=region.Id,
                         Name="Akassia Club Calimera Swiss Resort",
                         Description="Готель розташований в місті Ель-Кусейр. Відкритий в 2002 році, остання реставрація пройшла в 2011 році." +
                         " Гості можуть користуватися територією і послугами готелю LTI Akassia Beach Resort. Готель підійде для сімейного відпочинку," +
                         " романтичної подорожі і для відпочинку в колі друзів. Розташований в 36 км від аеропорту м Марса Алам і в 165 км від аеропорту Хургади.",
                         RoomsCount=444,
                         Rate=4.29,
                         Price=550
                    },
                    new Hotels
                    {
                         Class=4,
                         RegionId=region.Id,
                         Name="Aurora Bay Resort Marsa Alam",
                         Description="Готель розташований в 308 км від аеропорту Хургади, в 165 км від центру Ель-Кусейр і в 15 км від Марса Алам. Відкритий в 2010 році." +
                         " Готель прекрасно підійде для романтичного відпочинку, поїздок з друзями або для подорожі з сім'єю. Готель знаходиться в 45 км від аеропорту Марса-Алам.",
                         RoomsCount=98,
                         Rate=4.09,
                         Price=572
                    },
                    new Hotels
                    {
                         Class=4,
                         RegionId=region.Id,
                         Name="Aurora Nada Resort",
                         Description="Готель Aurora Nada Marsa Alam Resort був відкритий в 2007 році, дата останньої реновації 2012 рік." +
                         " Готель побудований в давньо-нубійському стилі на березі Червоного моря в затишному районі Shoni зі своїм 400 метровим пляжем." +
                         " Складається з двох триповерхових корпусів А і B. Підходить для сімейного відпочинку з дітьми або відпочинку компанії друзів." +
                         " У 20 км від аеропорту м Марса Алам, 40 км від м Марса Алам.",
                         RoomsCount=264,
                         Rate=4.17,
                         Price=475
                    },
                    new Hotels
                    {
                         Class=3,
                         RegionId=region.Id,
                         Name="Bliss Abo Nawas",
                         Description="Готель оформлений в нубійському стилі. Складається з основної будівлі і 5 корпусів різної поверховості." +
                         " Готель розташований в 110 км від центру міста Ель-Кусейр, на самому березі моря. Підійде для спокійного сімейного відпочинку. " +
                         "Відстань до Марса Алам 20 км, до аеропорту Марса Алам 45 км, до Хургади - 255 км.",
                         RoomsCount=200,
                         Rate=4.18,
                         Price=480
                    },
                     new Hotels
                    {
                         Class=5,
                         RegionId=region.Id,
                         Name="Calimera Habiba Beach Resort",
                         Description="Готель розташований на березі моря, поряд з власним кораловим пляжем." +
                         " Побудований в 2006 році і має мавританську архітектуру. Готель ідеально підійде для активного відпочинку," +
                         " сімейного відпочинку з дітьми і вивчення підводного світу Червоного моря. 22 км від центру м Марса Алам." +
                         " 38 км від аеропорту м Марса Алам.",
                         RoomsCount=334,
                         Rate=4.49,
                         Price=500
                    }
            });

            regionName = "Хургада";            
            region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            SeederDB.SeedHotelsHelper(context, region, new Hotels[]
             {
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Al Mas Red Sea Palace",
                        Description="Готель розташований в 17 км від м Хургада." +
                        " Входить в мережу River Rock Hotels & Resorts." +
                        " Побудований в 2001 році, а останній ремонт проведений в 2011 р." +
                        " Гості мають можливість користуватися всією інфраструктурою готелів Diamond Red Sea Resort і" +
                        " Paradise Red Sea Resort - барами, басейнами, пляжем, аквапарком, дайвінг-центром, оздоровчим центром," +
                        " тенісними кортами, центром водних видів спорту і т.д. Підійде для активного сімейного, " +
                        "молодіжного або романтичного відпочинку. У 12 км від аеропорту, в 23 км від Хургади, на березі моря.",
                        RoomsCount=434,
                        Rate=3.88,
                        Price=520
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Aladdin Beach Resort",
                        Description="Готель розташований на першій лінії, має власний пляж. Тут запропоновано великий вибір розваг і способів активного відпочинку." +
                        " Відкритий в 1995 році, регулярно проводиться часткова реновація. Складається з основного 2-поверхової будівлі (лише рецепшн)," +
                        " двох 2-поверхових корпусів і комплексу 1-поверхових бунгало. Готель орієнтований на сімейний відпочинок з дітьми." +
                        " Готель розташований в 8 км від аеропорту Хургади, в 15 км від центру міста, на самому березі моря. Відстань до торгового центру Senzo Mall: 1,5 км.",
                        RoomsCount=99,
                        Rate=4.02,
                        Price=470
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Albatros Aqua Park",
                        Description="Готель розташований в самому початку туристичної зони Хургади, в 15 км від центру міста." +
                        " Входить до складу мережі готелів Pickalbatros Hotels." +
                        " Відкритий в 2000 році, останній ремонт проведений в 2016 р Готель прекрасно підійде для сімейного відпочинку з дітьми." +
                        " Готель розташований в 7 км від аеропорту Хургади.",
                        RoomsCount=246,
                        Rate=4.43,
                        Price=475
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Albatros Aqua Vista Resort",
                        Description="Готель входить до мережі Pickalbatros, знаходиться на другій лінії за готелем Beach Albatros 4 *." +
                        " Справа знаходяться готелі - Pickalbatros Sea World 4 * і Albatros Garden 4 *, на їх територіях є дитячий і дорослий аквапарки," +
                        " гості готелю Albatros Aqua Vista Resort & Spa 4 * можуть абсолютно безкоштовно ними користуватися." +
                        " Відкритий в 2008 році. Готель прекрасно підійде для сімейного відпочинку з дітьми. У 7 км від міжнародного аеропорту Хургади," +
                        " в 15 км від центру Хургади",
                        RoomsCount=273,
                        Rate=4.54,
                        Price=500
                    },
                    new Hotels
                    {
                        Class=3,
                        RegionId=region.Id,
                        Name="Ali Baba Palace",
                        Description="Готель розташований в Хургаді. Відкритий в 2000 році, остання часткова реновація пройшла в 2009 році. " +
                        "Гості можуть користуватися послугами готелів Jasmine Village і Aladdin Beach Resort. " +
                        "Готель підійде для сімейного, молодіжного або романтичного відпочинку." +
                        " Готель розташований в 8 км від аеропорту Хургади, в 15 км від центру міста, на самому березі моря.",
                        RoomsCount=646,
                        Rate=4.15,
                        Price=400
                    }
            });
            

            regionName = "Шарм Ель Шейх";
            region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            SeederDB.SeedHotelsHelper(context, region, new Hotels[]
            {
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Aloha Sharm Hotel",
                        Description="Готель розташований в 7 км від Наама Бей, в Ом Ель Сід. Відкритий в 2004 році, останній ремонт проведений в 2015 р Готель підійде для сімейного," +
                        " молодіжного або романтичного відпочинку. У 18 км від аеропорту м Шарм-ель-Шейх, 7 км від Наама Бей, в Ом Ель Сід.",
                        RoomsCount=206,
                        Rate=4.45,
                        Price=420
                    },
                    new Hotels
                    {
                        Class=3,
                        RegionId=region.Id,
                        Name="Amar Sina",
                        Description="Готель знаходиться в районі Рас Умм Елсід в Шарм-ель-Шейху. У 8 км розташована набережна Наама-Бей з безліччю ресторанів і магазинів." +
                        " Готель вперше відчинила свої двері гостям в 1999 році. Готель підійде для молодіжного, романтичного або індивідуального відпочинку. У 18 км від аеропорту м Шарм-ель-Шейх.",
                        RoomsCount=98,
                        Rate=3.59,
                        Price=370
                    },
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Amwaj Oyoun Hotel",
                        Description="Готель розташований в районі Набк Бей. Був відкритий в 2007 році. При в'їзді в готель є казино VEGAS." +
                        " Готель прекрасно підійде для сімейного або індивідуального відпочинку, а також для подорожі з друзями або для бізнес-поїздок." +
                        " Готель розташований в 15 км від аеропорту міста Шарм ель Шейх.",
                        RoomsCount=465,
                        Rate=3.92,
                        Price=405
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Aqua Hotel Resort",
                        Description="Готель розташований в туристичному районі Шарм-еш-Шейха - Nabq Bay." +
                        " Був побудований в 2005 році. Остання реновація була в 2014 році." +
                        " Готель прекрасно підійде для сімейного відпочинку, романтичної подорожі і для поїздки з друзями." +
                        " Готель розташований в 15 км від аеропорту і в 20 км від центру міста Шарм ель Шейх.",
                        RoomsCount=127,
                        Rate=3.43,
                        Price=400
                    },
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Aurora Oriental Resort Sharm El Sheikh",
                        Description="Готель розташований на пляжній території і орієнтований фасадною стороною на острів Тиран," +
                        " до якого всього 20 хвилин їзди від курортного району Наама-бей. Готель вперше відчинила свої двері гостям в 2001 році." +
                        " Готель прекрасно підійде для сімейного відпочинку. Відстань до міжнародного аеропорту Шарм-еш-Шейха - 10 км.",
                        RoomsCount=264,
                        Rate=4.05,
                        Price=460
                    }
             });            

            regionName = "Сафага";
            region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            SeederDB.SeedHotelsHelper(context, region, new Hotels[]
            {
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Coral Sun Beach Safaga",
                        Description="Готель розташований в 22 км від м Сафага. Готель вперше розкрив свої двері гостям в 2011 році, останній ремонт був проведений в 2015 році. " +
                        "Готель підійде для сімейного відпочинку, романтичних подорожей або для поїздки з друзями. Готель розташований в 80 км від аеропорту м Хургада.",
                        RoomsCount=110,
                        Rate=4.45,
                        Price=430
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Menaville",
                        Description="Готель розташований прямо на березі Червоного моря. " +
                        "Відкритий в 1991 році, остання часткова реновація пройшла в 2010 році. " +
                        "Підійде для сімейного, романтичного або молодіжного відпочинку. " +
                        "Готель розташований в 45 км від аеропорту Хургади, в 8 км від міста Сафага і в 180 км від великого міста Луксора.",
                        RoomsCount=301,
                        Rate=4.08,
                        Price=440
                    },
            });            

            regionName = "Сахл Хашиш";
            region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            SeederDB.SeedHotelsHelper(context, region, new Hotels[]
            {
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Oberoi Sahl Hasheesh",
                        Description="Розташований на узбережжі Червоного моря The Oberoi, " +
                        "Sahl Hasheesh являє собою ексклюзивний люкс-курорт. Готель розташовується на території в 48 акрів. " +
                        "Торговий центр знаходяться в 25 хвилинах їзди від курортного готелю Oberoi Sahl Hasheesh. " +
                        "Готель підійде для пляжного відпочинку з сім'єю. Готель розташований в 17 км від аеропорту, в 20 км від центру Хургади, " +
                        "на самому березі моря.",
                        RoomsCount=102,
                        Rate=4.67,
                        Price=470
                    },
                    new Hotels
                    {
                        Class=4,
                        RegionId=region.Id,
                        Name="Ocean Breeze",
                        Description="Апартаменти Ocean Breeze з власним пляжем і відкритим басейном розташовані на морському узбережжі в районі" +
                        " Сахл-Хашіш міста Хургада в 17 км від зони для дайвінгу Малек-Дішан і в 23 км від зони для дайвінгу Абу-Хашиш. Готель був відкритий в 2018 році." +
                        " Всього в готелі 439 номерів які розташовані в головній 6-ти поверховій будівлі, віллах і бунгало. У 23 км знаходиться затока Джетт-Макаді-Бей " +
                        "і Центр дайвінгу Субаква Санрайз. Відстань до Міжнародного аеропорту Хургада становить 3 км",
                        RoomsCount=98,
                        Rate=3.99,
                        Price=390
                    },
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Old Palace Resort",
                        Description="Готель розташований в Хургаді, в районі Саль-Хашиш, за Порожніми горами на приватному піщаному пляжі. Дата відкриття - 2008 рік, " +
                        "дата останньої реставрації - 2011 р Недалеко від готелю розташований променад з магазинами та ресторанами. Готель підійде для сімейного, романтичного" +
                        " або молодіжного відпочинку. Готель розташований в 23 км від аеропорту, в 25 км від центру Хургади.",
                        RoomsCount=292,
                        Rate=4.5,
                        Price=505
                    },
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Pyramisa Sahl Hasheesh",
                        Description="Готель розташований на піщаному пляжі в бухті Сахл Хашіш. " +
                        "Побудований в 2007 році, остання реставрація проведена в 2014 році. " +
                        "Складається з основного 2-, 3- і 4-поверхової будівлі (каскадом), додаткового 2-," +
                        " 3- і 4-поверхового корпусу (каскадом) і трьох 2-поверхових вілл. Готель з сучасними і" +
                        " стильними номерами пропонує своїм гостям чудовий пляж, ресторани на будь-який смак, " +
                        "а також численні розважальні заходи. Підходить для сімейного відпочинку з дітьми, " +
                        "а також для проведення конференцій. Готель розташований в 21 км від аеропорту, " +
                        "в 24 км від центру Хургади, в 200 км від м Луксор, на самому березі моря.",
                        RoomsCount=127,
                        Rate=4.41,
                        Price=550
                    },
                    new Hotels
                    {
                        Class=5,
                        RegionId=region.Id,
                        Name="Sensimar Premier Le Reve Hotel",
                        Description="Готель розташований в районі Сахл Хашіш на Єгипетському узбережжі Червоного моря. " +
                        "Відкритий в 2009 році, останній ремонт проведений в 2015 р. Готель приймає гостей старше 16 років. " +
                        "Підійде для романтичного відпочинку, поїздки з друзями або для індивідуального подорожі. " +
                        "У 22 км від аеропорту м Хургада, 25 км від м Хургада, в Сал Хашиш.",
                        RoomsCount=339,
                        Rate=4.82,
                        Price=560
                    }
            });           
        }

        public static void SeedToursHelper(EFContext context, Tours[] tours)
        {
            foreach (var t in tours)
            {
                if (context.Tours.FirstOrDefault(f => f.CityDepartureId == t.CityDepartureId && f.HotelId == t.HotelId && f.DaysCount == t.DaysCount && f.FromData == t.FromData && f.Price == t.Price) == null)
                {
                    context.Tours.Add(t);
                    context.SaveChanges();
                }
            }
        }

        public static void SeedTours(EFContext context)
        {
            string regionName = "Марса Алам";
            Regions region = context.Regions.FirstOrDefault(f => f.Name == regionName);
            string hotelName = "Akassia Club Calimera Swiss Resort";
            Hotels hotel = context.Hotels.FirstOrDefault(f => f.Name == hotelName && f.RegionId == region.Id);

            SeederDB.SeedToursHelper(context, new Tours[]
            {
                 new Tours
                 {
                     CityDepartureId=1,
                     HotelId=hotel.Id,
                     DaysCount=6,
                     Price=3300,
                     FromData=new DateTime(2020, 05, 25, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar) //DateTime.Now
                 },
                 new Tours
                 {
                     CityDepartureId=2,
                     HotelId=hotel.Id,
                     DaysCount=8,
                     Price=4400,
                     FromData=new DateTime(2020, 05, 24, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 },
                 new Tours
                 {
                     CityDepartureId=3,
                     HotelId=hotel.Id,
                     DaysCount=10,
                     Price=5500,
                     FromData=new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 }
            });           
           
            hotelName = "Aurora Bay Resort Marsa Alam";
            hotel = context.Hotels.FirstOrDefault(f => f.Name == hotelName && f.RegionId == region.Id);

            SeederDB.SeedToursHelper(context, new Tours[]
            {
                 new Tours
                 {
                     CityDepartureId=1,
                     HotelId=hotel.Id,
                     DaysCount=6,
                     Price=hotel.Price *6,
                     FromData=new DateTime(2020, 05, 26, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar) //DateTime.Now
                 },
                 new Tours
                 {
                     CityDepartureId=2,
                     HotelId=hotel.Id,
                     DaysCount=8,
                     Price=hotel.Price * 8,
                     FromData=new DateTime(2020, 05, 27, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 },
                 new Tours
                 {
                     CityDepartureId=3,
                     HotelId=hotel.Id,
                     DaysCount=10,
                     Price=hotel.Price *10,
                     FromData=new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                 }
            });
        }


        public static void SeedUsers(UserManager<DbUser> userManager,
           RoleManager<DbRole> roleManager)
        {
            var roleName1 = "Admin";
            if (roleManager.FindByNameAsync(roleName1).Result == null)
            {
                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName1
                }).Result;
            }

            var roleName2 = "User";
            if (roleManager.FindByNameAsync(roleName2).Result == null)
            {
                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName2
                }).Result;
            }

            var email1 = "admin@gmail.com";
            if (userManager.FindByEmailAsync(email1).Result == null)
            {
                var user = new DbUser
                {
                    FirstName = "Vasyl",
                    MiddleName = "Vasylyovych",
                    LastName = "Vasylyuk",
                    DateOfBirth = DateTime.Now,
                    AvatarUrl = "no_image.jpg",
                    Email = email1,
                    UserName = email1,
                    SignUpTime = DateTime.Now,
                };

                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                result = userManager.AddToRoleAsync(user, roleName1).Result;
            }

            var email2 = "user@gmail.com";
            if (userManager.FindByEmailAsync(email2).Result == null)
            {
                var user = new DbUser
                {
                    FirstName = "Ivan",
                    MiddleName = "Ivavovych",
                    LastName = "Ivanenko",
                    DateOfBirth = DateTime.Now,
                    AvatarUrl = "1e55aeb8-852a-45e9-b0e8-1538fd8f5282.jpg",
                    Email = email2,
                    UserName = email2,
                    SignUpTime = DateTime.Now,
                };

                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                result = userManager.AddToRoleAsync(user, roleName2).Result;
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
                SeederDB.SeedCountries(context);
                SeederDB.SeedRegions(context);
                SeederDB.SeedCityDepartures(context);
                SeederDB.SeedHotels(context);
                SeederDB.SeedTours(context);
                SeederDB.SeedFilters(context);
            }
        }
    }
}
