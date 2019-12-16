using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;


namespace TouristApp.DAL.Entities
{
    public class SeederDB
    {
        private static void SeedFilters(EFContext context)
        {
            #region tblFilterNames - Назви фільтрів
            const string FILTER_NAME_HOTEL_COUNTRY = "Країни";
            const string FILTER_NAME_CITY = "Місто вильоту";
            const string FILTER_NAME_HOTEL_CLASS = "Клас готелю";
            const string FILTER_NAME_HOTEL_FOOD = "Харчування";
            const string FILTER_NAME_TOUR_ADULTS = "Кількість туристів";

            string[] filterNames = { FILTER_NAME_HOTEL_COUNTRY, FILTER_NAME_CITY, FILTER_NAME_HOTEL_CLASS, FILTER_NAME_HOTEL_FOOD, FILTER_NAME_TOUR_ADULTS };
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
                new string [] {"2*", "3*", "4*", "5*"},
                new string [] {
                    "Без харчування",
                    "Сніданок",
                    "Сніданок і вечеря",
                    "Повний пансіон",
                    "Усе включено",
                    "Ультра все включено"
                },
                new string [] {
                    "1 AD",
                    "2 AD",
                    "3 AD",
                    "4 AD",
                    "5 AD",
                    "6 AD"
                }
            };
           
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

            #region tblFilters - Фільтри
            List<Filter> fils = new List<Filter>();
            CityDeparture city = null;
            Hotel hotel = null;
            Country country = null;
            HotelFood food = null;
            RoomType roomType = null;
           
            var filterNameHotelClass = context.FilterNames.SingleOrDefault(f => f.Name == FILTER_NAME_HOTEL_CLASS);
            var filterNameHotelCountry = context.FilterNames.SingleOrDefault(f => f.Name == FILTER_NAME_HOTEL_COUNTRY);
            var filterNameCity = context.FilterNames.SingleOrDefault(f => f.Name == FILTER_NAME_CITY);
            var filterNameHotelFood = context.FilterNames.SingleOrDefault(f => f.Name == FILTER_NAME_HOTEL_FOOD);
            var filterNameTourAdults= context.FilterNames.SingleOrDefault(f => f.Name == FILTER_NAME_TOUR_ADULTS);

            if (filterNameHotelClass != null && filterNameHotelCountry != null && filterNameCity != null
                && filterNameHotelFood != null && filterNameTourAdults != null)
            {
                foreach (var tour in context.Tours)
                {
                    city = context.CityDepartures.FirstOrDefault(c => c.Id == tour.CityDepartureId);
                    hotel = context.Hotels.FirstOrDefault(h => h.Id == tour.RoomType.HotelId);
                    country = context.Countries.FirstOrDefault(c => c.Id == tour.RoomType.Hotel.Region.CountryId);
                    food = context.HotelFoods.FirstOrDefault(f => f.Id == tour.RoomType.Hotel.HotelFood.Id);
                    roomType = context.RoomTypes.FirstOrDefault(r => r.Id == tour.RoomTypeId);

                    if (city != null && hotel != null && country != null && food != null && roomType != null)
                    {
                        var filvalCity = context.FilterValues.FirstOrDefault(f => f.Name == city.Name);
                        var filvalHotelClass = context.FilterValues.FirstOrDefault(f => f.Name == hotel.Class.ToString() + "*");
                        var filvalHotelCountry = context.FilterValues.FirstOrDefault(f => f.Name == country.Name);
                        var filvalHotelFood = context.FilterValues.FirstOrDefault(f => f.Name == food.Name);
                        var filvalTourAdults = context.FilterValues.FirstOrDefault(f => f.Name == roomType.PlacesCount.ToString() + " AD");

                        if (filvalHotelClass != null && filvalHotelCountry != null && filvalCity != null && filvalHotelFood != null)
                        {
                            Filter[] filts =
                            {
                                new Filter { FilterNameId = filterNameHotelClass.Id, FilterValueId = filvalHotelClass.Id, TourId = tour.Id },  //клас готелю
                                new Filter { FilterNameId = filterNameHotelCountry.Id, FilterValueId = filvalHotelCountry.Id, TourId = tour.Id },  // країна
                                new Filter { FilterNameId = filterNameCity.Id, FilterValueId = filvalCity.Id, TourId = tour.Id }, // місто вильоту
                                new Filter { FilterNameId = filterNameHotelFood.Id, FilterValueId = filvalHotelFood.Id, TourId = tour.Id }, // харчування
                                new Filter { FilterNameId = filterNameTourAdults.Id, FilterValueId = filvalTourAdults.Id, TourId = tour.Id } // кількість дорослих
                            };

                            fils.AddRange(filts);
                        }
                    }
                };
            }

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

        #region SeedCountries
        public static void SeedCountries(EFContext context)
        {
            Country[] countries = new Country[]
            {
                new Country{
                    Name = "Австралія",
                    NormalizedName = "australia"
                },
                new Country{
                    Name = "Австрія",
                    NormalizedName = "austria"
                },
                new Country{
                    Name = "Азербайджан",
                    NormalizedName = "azerbaijan"
                },
                new Country{
                    Name = "Албанія",
                    NormalizedName = "albania"
                },
                new Country{
                    Name = "Андорра",
                    NormalizedName = "andorra"
                },
                new Country{
                    Name = "Аргентина",
                    NormalizedName = "argentina"
                },
                new Country{
                    Name = "Арменія",
                    NormalizedName = "armenia"
                },
                new Country{
                    Name = "Аруба",
                    NormalizedName = "aruba"
                },
                new Country{
                    Name = "Багамські Острови",
                    NormalizedName = "bahamas"
                },
                new Country{
                    Name = "Бангладеш",
                    NormalizedName = "bangladesh"
                },
                new Country{
                    Name = "Барбадос",
                    NormalizedName = "barbados"
                },
                new Country{
                    Name = "Білорусь",
                    NormalizedName = "belarus"
                },
                new Country{
                    Name = "Бірма",
                    NormalizedName = "burma"
                },
                new Country{
                    Name = "Бельгія",
                    NormalizedName = "belgium"
                },
                new Country{
                    Name = "Болгарія",
                    NormalizedName = "bulgaria"
                },
                new Country{
                    Name = "Болівія",
                    NormalizedName = "bolivia"
                },
                new Country{
                    Name = "Боснія и Герцеговина",
                    NormalizedName = "bosnia-and-herzegovina"
                },
                new Country{
                    Name = "Бразилія",
                    NormalizedName = "brazil"
                },
                new Country{
                    Name = "Бутан",
                    NormalizedName = "butane"
                },
                new Country{
                    Name = "Великобританія",
                    NormalizedName = "united-kingdom"
                },
                new Country{
                    Name = "Венгрія",
                    NormalizedName = "hungary"
                },
                new Country{
                    Name = "В'єтнам",
                    NormalizedName = "vietnam"
                },
                new Country{
                    Name = "Гватемала",
                    NormalizedName = "guatemala"
                },
                new Country{
                    Name = "Гондурас",
                    NormalizedName = "honduras"
                },
                new Country{
                    Name = "Гонконг",
                    NormalizedName = "hong-kong"
                },
                new Country{
                    Name = "Греція",
                    NormalizedName = "greece"
                },
                new Country{
                    Name = "Грузія",
                    NormalizedName = "georgia"
                },
                new Country{
                    Name = "Данія",
                    NormalizedName = "denmark"
                },
                new Country{
                    Name = "Домінікана",
                    NormalizedName = "dominican-republic"
                },
                new Country{
                    Name = "Іспанія",
                    NormalizedName = "spain"
                },
                new Country{
                    Name = "Еквадор",
                    NormalizedName = "ecuador"
                },
                new Country{
                    Name = "Естонія",
                    NormalizedName = "estonia"
                },
                new Country{
                    Name = "Єгипет",
                    NormalizedName = "egypt"
                },
                new Country{
                    Name = "Зімбабве",
                    NormalizedName = "zimbabwe"
                },
                new Country{
                    Name = "Ізраїль",
                    NormalizedName = "israel"
                },
                new Country{
                    Name = "Індонезія",
                    NormalizedName = "indonesia"
                },
                new Country{
                    Name = "Індія",
                    NormalizedName = "india"
                },
                new Country{
                    Name = "Іран",
                    NormalizedName = "iran"
                },
                new Country{
                    Name = "Ірландія",
                    NormalizedName = "ireland"
                },
                new Country{
                    Name = "Ісландія",
                    NormalizedName = "iceland"
                },
                new Country{
                    Name = "Італія",
                    NormalizedName = "italy"
                },
                new Country{
                    Name = "Йорданія",
                    NormalizedName = "jordan"
                },
                new Country{
                    Name = "Камбоджа",
                    NormalizedName = "cambodia"
                },
                new Country{
                    Name = "Канада",
                    NormalizedName = "canada"
                },
                new Country{
                    Name = "Катар",
                    NormalizedName = "qatar"
                },
                new Country{
                    Name = "Кенія",
                    NormalizedName = "kenya"
                },
                new Country{
                    Name = "Кіпр",
                    NormalizedName = "cyprus"
                },
                new Country{
                    Name = "Китай",
                    NormalizedName = "china"
                },
                new Country{
                    Name = "Коста-Ріка",
                    NormalizedName = "costa-rica"
                },
                new Country{
                    Name = "Куба",
                    NormalizedName = "cuba"
                },
                new Country{
                    Name = "Кюрасао",
                    NormalizedName = "curacao"
                },
                new Country{
                    Name = "Лаос",
                    NormalizedName = "laos"
                },
                new Country{
                    Name = "Латвія",
                    NormalizedName = "latvia"
                },
                new Country{
                    Name = "Литва",
                    NormalizedName = "lithuania"
                },
                new Country{
                    Name = "Ліхтенштейн",
                    NormalizedName = "liechtenstein"
                },
                new Country{
                    Name = "Люксембург",
                    NormalizedName = "luxembourg"
                },
                new Country{
                    Name = "Маврикій",
                    NormalizedName = "mauritius"
                },
                new Country{
                    Name = "Мадагаскар",
                    NormalizedName = "madagascar"
                },
                new Country{
                    Name = "Македонія",
                    NormalizedName = "macedonia"
                },
                new Country{
                    Name = "Малайзія",
                    NormalizedName = "malaysia"
                },
                new Country{
                    Name = "Мальдіви",
                    NormalizedName = "maldives"
                },
                new Country{
                    Name = "Мальта",
                    NormalizedName = "malta"
                },
                new Country{
                    Name = "Марокко",
                    NormalizedName = "morocco"
                },
                new Country{
                    Name = "Мексика",
                    NormalizedName = "mexico"
                },
                new Country{
                    Name = "Молдова",
                    NormalizedName = "moldova"
                },
                new Country{
                    Name = "Монако",
                    NormalizedName = "monaco"
                },
                new Country{
                    Name = "М'янма",
                    NormalizedName = "myanmar"
                },
                new Country{
                    Name = "Непал",
                    NormalizedName = "nepal"
                },
                new Country{
                    Name = "Нідерланди",
                    NormalizedName = "netherlands"
                },
                new Country{
                    Name = "Нікарагуа",
                    NormalizedName = "nicaragua"
                },
                new Country{
                    Name = "Німеччина",
                    NormalizedName = "germany"
                },
                new Country{
                    Name = "Новая Зеландія",
                    NormalizedName = "new-zealand"
                },
                new Country{
                    Name = "Норвегія",
                    NormalizedName = "norway"
                },
                new Country{
                    Name = "ОАЕ",
                    NormalizedName = "uae"
                },
                new Country{
                    Name = "Оман",
                    NormalizedName = "oman"
                },
                new Country{
                    Name = "ПАР",
                    NormalizedName = "sar"
                },
                new Country{
                    Name = "Парагвай",
                    NormalizedName = "paraguay"
                },
                new Country{
                    Name = "Південна Корея",
                    NormalizedName = "south-korea"
                },
                 new Country{
                    Name = "Перу",
                    NormalizedName = "peru"
                },
                new Country{
                    Name = "Польща",
                    NormalizedName = "poland"
                },
                new Country{
                    Name = "Португалія",
                    NormalizedName = "portugal"
                },
                new Country{
                    Name = "Росія",
                    NormalizedName = "russia"
                },
                new Country{
                    Name = "Румунія",
                    NormalizedName = "romania"
                },
                new Country{
                    Name = "Сан-Марино",
                    NormalizedName = "san-marino"
                },
                new Country{
                    Name = "Сейшельські о.",
                    NormalizedName = "seychelles"
                },
                new Country{
                    Name = "Сен-Бартельмі",
                    NormalizedName = "saint-barthelemy"
                },
                new Country{
                    Name = "Сен-Мартен",
                    NormalizedName = "saint-martin"
                },
                new Country{
                    Name = "Сербія",
                    NormalizedName = "serbia"
                },
                new Country{
                    Name = "Сінгапур",
                    NormalizedName = "singapore"
                },
                new Country{
                    Name = "Словакія",
                    NormalizedName = "slovakia"
                },
                new Country{
                    Name = "Словенія",
                    NormalizedName = "slovenia"
                },
                new Country{
                    Name = "США",
                    NormalizedName = "usa"
                },
                new Country{
                    Name = "Таїланд",
                    NormalizedName = "thailand"
                },
                new Country{
                    Name = "Танзанія",
                    NormalizedName = "tanzania"
                },
                new Country{
                    Name = "Турція",
                    NormalizedName = "turkey"
                },
                new Country{
                    Name = "Туніс",
                    NormalizedName = "tunisia"
                },
                new Country{
                    Name = "Україна",
                    NormalizedName = "ukraine"
                },
                new Country{
                    Name = "Філіппіни",
                    NormalizedName = "philippines"
                },
                new Country{
                    Name = "Фінляндія",
                    NormalizedName = "finland"
                },
                new Country{
                    Name = "Франція",
                    NormalizedName = "france"
                },
                new Country{
                    Name = "Французька Полінезія",
                    NormalizedName = "french-polynesia"
                },
                new Country{
                    Name = "Хорватія",
                    NormalizedName = "croatia"
                },
                new Country{
                    Name = "Чехія",
                    NormalizedName = "czech-republic"
                },
                new Country{
                    Name = "Чорногорія",
                    NormalizedName = "montenegro"
                },
                new Country{
                    Name = "Чилі",
                    NormalizedName = "chile"
                },
                new Country{
                    Name = "Швейцарія",
                    NormalizedName = "switzerland"
                },
                new Country{
                    Name = "Швеція",
                    NormalizedName = "sweden"
                },
                new Country{
                    Name = "Шотландія",
                    NormalizedName = "scotland"
                },
                new Country{
                    Name = "Шрі Ланка",
                    NormalizedName = "sri-lanka"
                },
                new Country{
                    Name = "Ямайка",
                    NormalizedName = "jamaica"
                },
                new Country{
                    Name = "Японія",
                    NormalizedName = "japan"
                },
            };

            foreach (var country in countries)
            {
                if (context.Countries.FirstOrDefault(f => f.Name == country.Name) == null)
                {
                    context.Countries.Add(new Country { Name = country.Name, NormalizedName = country.NormalizedName });
                    context.SaveChanges();
                }
            }
        }
        #endregion

        public static void SeedHotelFoods(EFContext context)
        {
            string[] hotelFoods_names = new string[]
            {
                "Без харчування",
                "Сніданок",
                "Сніданок і вечеря",
                "Повний пансіон",
                "Усе включено",
                "Ультра все включено"
            };

            foreach (var name in hotelFoods_names)
            {
                if (context.HotelFoods.FirstOrDefault(f => f.Name == name) == null)
                {
                    context.HotelFoods.Add(new HotelFood { Name = name });
                    context.SaveChanges();
                }
            }
        }

        public static void SeedRoomTypes(EFContext context)
        {
            string[] roomTypes_names = new string[]
            {
                "Без харчування",
                "Сніданок",
                "Сніданок і вечеря",
                "Повний пансіон",
                "Усе включено",
                "Ультра все включено"
            };

            foreach (var name in roomTypes_names)
            {
                if (context.HotelFoods.FirstOrDefault(f => f.Name == name) == null)
                {
                    context.HotelFoods.Add(new HotelFood { Name = name });
                    context.SaveChanges();
                }
            }
        }

        public static void SeedRegionsHelper(EFContext context, string countryName, string[] regions_names)
        {
            Country country = context.Countries.FirstOrDefault(f => f.Name == countryName);

            if (country != null)
            {
                foreach (var name in regions_names)
                {
                    if (context.Regions.FirstOrDefault(f => f.Name == name && f.Country.Name == countryName) == null)
                    {
                        context.Regions.Add(new Region { Name = name, CountryId = country.Id });
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
                    context.CityDepartures.Add(new CityDeparture { Name = name });
                    context.SaveChanges();
                }
            }
        }       

        public static void SeedHotelsHelper(EFContext context, Region region, HotelFood hotelFood, string hotelName, Hotel hotel, RoomType[] roomTypes)
        {
            if (context.Hotels.FirstOrDefault(f => f.Name == hotelName && f.RegionId == region.Id) == null)
            {
                context.Hotels.Add(hotel);
                context.SaveChanges();
            }

            hotel = context.Hotels.FirstOrDefault(h => h.RegionId == region.Id && h.Name == hotelName);

            if (hotel != null)
            {
                foreach (var roomType in roomTypes)
                {
                    roomType.HotelId = hotel.Id;
                    if (context.RoomTypes.FirstOrDefault(f => f.Name == roomType.Name && f.Description == roomType.Description && f.ExtraBedType == roomType.ExtraBedType && f.Price == roomType.Price && f.HotelId == hotel.Id) == null)
                    {
                        context.RoomTypes.Add(roomType);
                        context.SaveChanges();
                    }
                }
            }
        }


        public static void SeedHotels(EFContext context)
        {
            //string countryName = "Єгипет";
            string hotelFoodNameNoFood = "Без харчування";
            string hotelFoodNameBreakfast = "Сніданок";
            string hotelFoodNameBreakfastAndDinner = "Сніданок і вечеря";
            string hotelFoodNameFoolBoard = "Повний пансіон";
            string hotelFoodNameAllInclusive = "Усе включено";
            string hotelFoodNameUltraAllInclusive = "Ультра все включено";

            HotelFood hotelFoodNoFood = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameNoFood);
            HotelFood hotelFoodBreakfast = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameBreakfast);
            HotelFood hotelFoodBreakfastAndDinner = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameBreakfastAndDinner);
            HotelFood hotelFoodFoolBoard = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameFoolBoard);
            HotelFood hotelFoodAllInclusive = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameAllInclusive);
            HotelFood hotelFoodUltraAllInclusive = context.HotelFoods.FirstOrDefault(f => f.Name == hotelFoodNameUltraAllInclusive);

            if (hotelFoodNoFood != null && hotelFoodBreakfast != null && hotelFoodBreakfastAndDinner != null
                && hotelFoodFoolBoard != null && hotelFoodAllInclusive != null && hotelFoodUltraAllInclusive != null)
            {
                string regionName = "Марса Алам";
                Region region = context.Regions.FirstOrDefault(f => f.Name == regionName);
                HotelFood hotelFood;
                string hotelName;

                if (region != null)
                {
                    hotelName = "Akassia Club Calimera Swiss Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodNoFood, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "marsa-alam-akassia-club-calimera-swiss-resort",
                            Description = "Готель розташований в місті Ель-Кусейр. Відкритий в 2002 році, остання реставрація пройшла в 2011 році." +
                             " Гості можуть користуватися територією і послугами готелю LTI Akassia Beach Resort. Готель підійде для сімейного відпочинку," +
                             " романтичної подорожі і для відпочинку в колі друзів. Розташований в 36 км від аеропорту м Марса Алам і в 165 км від аеропорту Хургади." +
                             " Відстань до моря: 1 лінія.",
                            RoomsCount = 444,
                            Rate = 4.29,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                            new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад, басейн або частковим видом на море. У номері king bed або twin beds. Одне додаткове місце - розкладачка з матрацом.",
                                TotalArea = 50.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладачка з матрацом",
                                Price = 55.4m,
                            },
                            new RoomType
                            {
                                Name = "Beach Front Room",
                                Description = "Beach Front Room - стандартний номер з видом на море, розташований поруч із пляжем. У номері king bed або twin beds. Одне додаткове місце - розкладачка з матрацом.",
                                TotalArea = 50.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладачка з матрацом",
                                Price = 65.5m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з видом на аквапарк, басейн або сад. Складається з двох кімнат, в номері king bed і twin beds. Номер розташований біля аквапарку, до пляжу їздить автобус.",
                                TotalArea = 50.0,
                                RoomsCount = 2,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладачка з матрацом",
                                Price = 105.5m,
                             }
                        });

                    hotelName = "Aurora Bay Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodBreakfast, hotelName,
                       new Hotel
                       {
                           Class = 5,
                           RegionId = region.Id,
                           Name = hotelName,
                           NormalizedName = "marsa-alam-aurora-bay-resort",
                           Description = "Готель розташований в 308 км від аеропорту Хургади, в 165 км від центру Ель-Кусейр і в 15 км від Марса Алам. Відкритий в 2010 році." +
                             " Готель прекрасно підійде для романтичного відпочинку, поїздок з друзями або для подорожі з сім'єю. Готель знаходиться в 45 км від аеропорту Марса-Алам." +
                             "Відстань до моря (2 лінія): 200 м.",
                           RoomsCount = 98,
                           Rate = 4.09,
                           HotelFoodId = hotelFood.Id
                       },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Classic Room",
                                Description = "Classic Room - стандартний номер з видом на сад. Загальні вітальня і балкон на два номери. Одне додаткове місце - софа або розкладачка з матрацом.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 55.4m,
                            },
                            new RoomType
                            {
                                Name = "Superior Room",
                                Description = "Superior Room - покращений номер з видом на сад, басейн або частковим видом на море. Номер складається з спальної кімнати, вітальні і кухні. У номері king bed, одне додаткове місце - софа або розкладачка з матрацом",
                                TotalArea = 60.0,
                                RoomsCount = 3,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 55.4m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з видом на сад або море. Номер складається з двох спальних кімнат, вітальні і кухні. У номері king bed і twin beds. Додаткове місце - софа або розкладачка з матрацом.",
                                TotalArea = 65.0,
                                RoomsCount = 5,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 98.5m,
                             }
                        });

                    hotelName = "Aurora Nada Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodBreakfastAndDinner, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "marsa-alam-aurora-nada-resort",
                            Description = "Готель Aurora Nada Marsa Alam Resort був відкритий в 2007 році, дата останньої реновації 2012 рік." +
                             " Готель побудований в давньо-нубійському стилі на березі Червоного моря в затишному районі Shoni зі своїм 400 метровим пляжем." +
                             " Складається з двох триповерхових корпусів А і B. Підходить для сімейного відпочинку з дітьми або відпочинку компанії друзів." +
                             " У 20 км від аеропорту м Марса Алам, 40 км від м Марса Алам. Відстань до моря: 1 лінія.",
                            RoomsCount = 264,
                            Rate = 4.17,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                            new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад, басейн або море. У номері king size bed або twin beds. Одне додаткове місце - розкладне односпальне ліжко односпальне ліжко.",
                                TotalArea = 30.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 55.4m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з однієї кімнати з видом на сад, басейн або море. У номері king bed або twin beds.. Одне додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 65.5m,
                             },
                              new RoomType
                              {
                                Name = "Suite",
                                Description = "Suite - номер з двох кімнат, спальні і вітальні з видом на сад, басейн або море. У номері king bed.. Одне додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 55.0,
                                RoomsCount = 2,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 75.0m,
                              }
                        });

                    hotelName = "Bliss Abo Nawas";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 3,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "marsa-alam-bliss-abo-nawas",
                            Description = "Готель оформлений в нубійському стилі. Складається з основної будівлі і 5 корпусів різної поверховості." +
                             " Готель розташований в 110 км від центру міста Ель-Кусейр, на самому березі моря. Підійде для спокійного сімейного відпочинку. " +
                             "Відстань до Марса Алам 20 км, до аеропорту Марса Алам 45 км, до Хургади - 255 км.",
                            RoomsCount = 200,
                            Rate = 4.18,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                            new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - номери в нубійському стилі з купольними стелями і кам'яними арками. З номера відкривається гарний вид на сад, басейн або море. У номері king size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 25.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 48.4m,
                            },
                            new RoomType
                            {
                                Name = "Suite",
                                Description = "Superior Room - номер з вітальнею і спальнею. З номера відкривається гарний вид на сад, басейн або море. У номері king size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 55.0m,
                            }
                        });

                    hotelName = "Calimera Habiba Beach Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodFoolBoard, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = "Calimera Habiba Beach Resort",
                            NormalizedName = "marsa-alam-calimera-habiba-beach-resort",
                            Description = "Готель розташований на березі моря, поряд з власним кораловим пляжем." +
                                     " Побудований в 2006 році і має мавританську архітектуру. Готель ідеально підійде для активного відпочинку," +
                                     " сімейного відпочинку з дітьми і вивчення підводного світу Червоного моря. 22 км від центру м Марса Алам." +
                                     " 38 км від аеропорту м Марса Алам.",
                            RoomsCount = 334,
                            Rate = 4.49,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                            new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад, басейн або море. У номері king bed або twin beds. Одне додаткове місце - софа.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 55.4m,
                            },
                             new RoomType
                             {
                                Name = "Superior Room",
                                Description = "Superior Room - покращений номер з видом на сад, басейн або море. У номері king bed або twin beds. Одне додаткове місце - софа.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 65.5m,
                             },
                              new RoomType
                              {
                                Name = "Junior Suite",
                                Description = "Junior Suite - номер з видом на сад, басейн або море. Номер складається з вітальні і спальної кімнати. У номері king bed, додаткове місце - софа.",
                                TotalArea = 55.0,
                                RoomsCount = 2,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 75.0m,
                              },
                               new RoomType
                              {
                                Name = "Junior Suite",
                                Description = "Royal Suite - номер люкс з виглядом на море. Номер складається з вітальні, спальної кімнати, невеликої кухні та тераси з джакузі, додаткове місце - софа.",
                                TotalArea = 55.0,
                                RoomsCount = 3,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 75.0m,
                              }
                        });


                    regionName = "Хургада";
                    hotelName = "Al Mas Red Sea Palace";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodNoFood, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "hurgada-al-mas-red-sea-palace",
                            Description = "Готель розташований в 17 км від м Хургада." +
                                                " Входить в мережу River Rock Hotels & Resorts." +
                                                " Побудований в 2001 році, а останній ремонт проведений в 2011 р." +
                                                " Гості мають можливість користуватися всією інфраструктурою готелів Diamond Red Sea Resort і" +
                                                " Paradise Red Sea Resort - барами, басейнами, пляжем, аквапарком, дайвінг-центром, оздоровчим центром," +
                                                " тенісними кортами, центром водних видів спорту і т.д. Підійде для активного сімейного, " +
                                                "молодіжного або романтичного відпочинку. У 12 км від аеропорту, в 23 км від Хургади, на березі моря.",
                            RoomsCount = 434,
                            Rate = 3.88,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Classic Room",
                                Description = "Classic Room - стандартний номер з видом на сад. Загальні вітальня і балкон на два номери. Одне додаткове місце - софа або розкладачка з матрацом.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 75.4m,
                            },
                            new RoomType
                            {
                                Name = "Superior Room",
                                Description = "Superior Room - покращений номер з видом на сад, басейн або частковим видом на море. Номер складається з спальної кімнати, вітальні і кухні. У номері king bed, одне додаткове місце - софа або розкладачка з матрацом",
                                TotalArea = 60.0,
                                RoomsCount = 3,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 76.5m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з видом на сад або море. Номер складається з двох спальних кімнат, вітальні і кухні. У номері king bed і twin beds. Додаткове місце - софа або розкладачка з матрацом.",
                                TotalArea = 65.0,
                                RoomsCount = 5,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа або розкладачка з матрацом",
                                Price = 100.5m,
                             }
                        });

                    hotelName = "Aladdin Beach Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodFoolBoard, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "hurgada-aladdin-beach-resort",
                            Description = "Готель розташований на першій лінії, має власний пляж. Тут запропоновано великий вибір розваг і способів активного відпочинку." +
                                                " Відкритий в 1995 році, регулярно проводиться часткова реновація. Складається з основного 2-поверхової будівлі (лише рецепшн)," +
                                                " двох 2-поверхових корпусів і комплексу 1-поверхових бунгало. Готель орієнтований на сімейний відпочинок з дітьми." +
                                                " Готель розташований в 8 км від аеропорту Хургади, в 15 км від центру міста, на самому березі моря. Відстань до торгового центру Senzo Mall: 1,5 км.",
                            RoomsCount = 99,
                            Rate = 4.02,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад або басейн (Pool View), номер розташований в двоповерховому корпусі. У номері king bed, одне додаткове місце - софа.",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 68.2m,
                            },
                            new RoomType
                            {
                                Name = "Standard Bungalow",
                                Description = "Standard Bungalow - стандартний номер з видом на сад або басейн, розташований в одноповерховій бунгало. У номері twin beds, одне додаткове місце - софа.",
                                TotalArea = 38.0,
                                RoomsCount = 3,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 76.5m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з видом на сад або басейн, номер розташований в двоповерховому корпусі. У номері king bed або twin beds. Одне додаткове місце - софа.",
                                TotalArea = 65.0,
                                RoomsCount = 5,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 100.5m,
                             }
                        });

                    hotelName = "Albatros Aqua Park";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "hurgada-albatros-aqua-park",
                            Description = "Готель розташований в самому початку туристичної зони Хургади, в 15 км від центру міста." +
                                                " Входить до складу мережі готелів Pickalbatros Hotels." +
                                                " Відкритий в 2000 році, останній ремонт проведений в 2016 р Готель прекрасно підійде для сімейного відпочинку з дітьми." +
                                                " Готель розташований в 7 км від аеропорту Хургади.",
                            RoomsCount = 246,
                            Rate = 4.43,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - номер з видом на сад або басейн. У номері king size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 23.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 45.0m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер, складається з двох спалень і однієї ванної кімнати. Вид на басейн або сад. У номері king size bed і twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 41.0,
                                RoomsCount = 2,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 90.1m,
                             }
                        });


                    hotelName = "Albatros Aqua Vista Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodUltraAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "hurgada-albatros-aqua-vista-resort",
                            Description = "Готель входить до мережі Pickalbatros, знаходиться на другій лінії за готелем Beach Albatros 4 *." +
                                                " Справа знаходяться готелі - Pickalbatros Sea World 4 * і Albatros Garden 4 *, на їх територіях є дитячий і дорослий аквапарки," +
                                                " гості готелю Albatros Aqua Vista Resort & Spa 4 * можуть абсолютно безкоштовно ними користуватися." +
                                                " Відкритий в 2008 році. Готель прекрасно підійде для сімейного відпочинку з дітьми. У 7 км від міжнародного аеропорту Хургади," +
                                                " в 15 км від центру Хургади",
                            RoomsCount = 273,
                            Rate = 4.54,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на басейн, сад або гори. У номері queen size bed або twin beds. Два додаткових місця - twin beds.",
                                TotalArea = 41.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 2,
                                ExtraBedType = "twin beds",
                                Price = 45.0m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Room - сімейний номер з двома спальнями та ванною кімнатою, з видом на сад, басейн або гори. У номері queen size bed і twin beds. Два додаткових місця - twin beds.",
                                TotalArea = 82.0,
                                RoomsCount = 2,
                                PlacesCount = 2,
                                ExtraPlacesCount = 2,
                                ExtraBedType = "twin beds",
                                Price = 92.2m,
                             }
                        });

                    hotelName = "Ali Baba Palace";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodBreakfast, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = "Ali Baba Palace",
                            NormalizedName = "hurgada-ali-baba-palace",
                            Description = "Готель розташований в Хургаді. Відкритий в 2000 році, остання часткова реновація пройшла в 2009 році. " +
                                                "Гості можуть користуватися послугами готелів Jasmine Village і Aladdin Beach Resort. " +
                                                "Готель підійде для сімейного, молодіжного або романтичного відпочинку." +
                                                " Готель розташований в 8 км від аеропорту Хургади, в 15 км від центру міста, на самому березі моря.",
                            RoomsCount = 646,
                            Rate = 4.15,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад, басейн (Pool View) або частковим видом на море (Sea Side View). У номері king bed або twin beds. Одне додаткове місце - софа.",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 60.0m,
                            },
                             new RoomType
                             {
                                Name = "Family Room",
                                Description = "Family Deluxe - сімейний номер з видом на сад або басейн. У номері king bed або twin beds і двох'ярусна ліжко. Одне додаткове місце - софа.",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 75.3m,
                             },
                             new RoomType
                            {
                                Name = "Family Connected",
                                Description = "Family Connected - сімейний номер з видом на басейн. Номер складається з двох стандартних номерів, з'єднаних міжкімнатними дверима. У номері king bed і twin beds.",
                                TotalArea = 70.0,
                                RoomsCount = 2,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 100.0m,
                            },
                             new RoomType
                             {
                                Name = "Deluxe",
                                Description = "Deluxe - покращений номер з видом на сад або басейн. У номері king bed або twin beds. Одне додаткове місце - софа.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "софа",
                                Price = 53.3m,
                             }
                        });


                    regionName = "Шарм Ель Шейх";
                    hotelName = "Aloha Sharm Hotel";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodBreakfastAndDinner, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sharm-el-sheikh-aloha-sharm-hotel",
                            Description = "Готель розташований в 7 км від Наама Бей, в Ом Ель Сід. Відкритий в 2004 році, останній ремонт проведений в 2015 р Готель підійде для сімейного," +
                                               " молодіжного або романтичного відпочинку. У 18 км від аеропорту м Шарм-ель-Шейх, 7 км від Наама Бей, в Ом Ель Сід.",
                            RoomsCount = 206,
                            Rate = 4.45,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - однокімнатний номер з видом на сад, басейн, територію готелю або околиці. У номері надається king size bed або twin beds. Надається тільки одне додаткове спальне місце - мобільне односпальне ліжко.",
                                TotalArea = 37.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 42.0m,
                            },
                            new RoomType
                            {
                                Name = "Sea View Room",
                                Description = "Sea View Room - однокімнатний номер з видом на море. У номері надається king size bed або twin beds. Надається тільки одне додаткове спальне місце - мобільне односпальне ліжко.",
                                TotalArea = 60.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 42.5m,
                            }
                        });

                    hotelName = "Amar Sina";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 3,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sharm-el-sheikh-amar-sina",
                            Description = "Готель знаходиться в районі Рас Умм Елсід в Шарм-ель-Шейху. У 8 км розташована набережна Наама-Бей з безліччю ресторанів і магазинів." +
                                                " Готель вперше відчинила свої двері гостям в 1999 році. Готель підійде для молодіжного, романтичного або індивідуального відпочинку. У 18 км від аеропорту м Шарм-ель-Шейх.",
                            RoomsCount = 98,
                            Rate = 3.59,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - однокімнатний номер з видом на сад, басейн, територію готелю або околиці. У номері надається king size bed або twin beds. Надається тільки одне додаткове спальне місце - мобільне односпальне ліжко.",
                                TotalArea = 37.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 40.0m,
                            },
                            new RoomType
                            {
                                Name = "Sea View Room",
                                Description = "Sea View Room - однокімнатний номер з видом на море. У номері надається king size bed або twin beds. Надається тільки одне додаткове спальне місце - мобільне односпальне ліжко.",
                                TotalArea = 37.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 52.5m,
                            }
                        });

                    hotelName = "Amwaj Oyoun Hotel";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodUltraAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sharm-el-sheikh-amwaj-oyoun-hotel",
                            Description = "Готель розташований в районі Набк Бей. Був відкритий в 2007 році. При в'їзді в готель є казино VEGAS." +
                                                " Готель прекрасно підійде для сімейного або індивідуального відпочинку, а також для подорожі з друзями або для бізнес-поїздок." +
                                                " Готель розташований в 15 км від аеропорту міста Шарм ель Шейх.",
                            RoomsCount = 465,
                            Rate = 3.92,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                             {
                                Name = "Standard Sport Area",
                                Description = "Standard Sport Area - номер з видом на сад, басейн або на територію сусіднього готелю. У номерах king-size bed або twin beds. Номери розміщені в окремому триповерховому будинку (зліва між в'їздом в готель і основною будівлею. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 40.0m,
                             },
                            new RoomType
                            {
                                Name = "Superior Garden View",
                                Description = "Standard Sport Area - номер з видом на сад. У номерах king-size bed або twin beds. Номери розміщені в окремому триповерховому будинку (зліва між в'їздом в готель і основною будівлею. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 43.0m,
                            },
                             new RoomType
                            {
                                Name = "Superior Pool View",
                                Description = "Standard Sport Area - номер з видом на басейн. У номерах king-size bed або twin beds. Номери розміщені в окремому триповерховому будинку (зліва між в'їздом в готель і основною будівлею. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 43.0m,
                            },
                              new RoomType
                            {
                                Name = "Superior Sea View",
                                Description = "Standard Sport Area - номер з видом на на море (seaside view). У номерах king-size bed або twin beds. Номери розміщені в окремому триповерховому будинку (зліва між в'їздом в готель і основною будівлею. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 43.0m,
                            },
                              new RoomType
                            {
                                Name = "1 Bedroom Family Room",
                                Description = "1 Bedroom Family Room - однокімнатний номер. У номерах king-size bed або twin beds. Додаткове місце - мобільне односпальне ліжко. Надається два додаткових спальних місця. Номери розміщені в основній будівлі.",
                                TotalArea = 48.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 2,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 48.0m,
                            },
                        });

                    hotelName = "Aqua Hotel Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodNoFood, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sharm-el-sheikh-aqua-hotel-resort",
                            Description = "Готель розташований в туристичному районі Шарм-еш-Шейха - Nabq Bay." +
                                                " Був побудований в 2005 році. Остання реновація була в 2014 році." +
                                                " Готель прекрасно підійде для сімейного відпочинку, романтичної подорожі і для поїздки з друзями." +
                                                " Готель розташований в 15 км від аеропорту і в 20 км від центру міста Шарм ель Шейх.",
                            RoomsCount = 127,
                            Rate = 3.43,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - номер з видом на курорт / околиці / головну дорогу. У номерах king size bed або twin beds (більшість номерів). Додаткове місце - мобільне односпальне ліжко. Є номери тільки з вікном (без балкона).",
                                TotalArea = 35.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 42.2m,
                            },
                            new RoomType
                            {
                                Name = "Pool View Room",
                                Description = "Pool View Room - номер з видом на басейн. У номерах king size bed або twin beds (більшість номерів). Додаткове місце - мобільне односпальне ліжко.",
                                TotalArea = 40.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "мобільне односпальне ліжко",
                                Price = 45.5m,
                            }
                        });

                    hotelName = "Aurora Oriental Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sharm-el-sheikh-aurora-oriental-resort",
                            Description = "Готель розташований на пляжній території і орієнтований фасадною стороною на острів Тиран," +
                                                " до якого всього 20 хвилин їзди від курортного району Наама-бей. Готель вперше відчинила свої двері гостям в 2001 році." +
                                                " Готель прекрасно підійде для сімейного відпочинку. Відстань до міжнародного аеропорту Шарм-еш-Шейха - 10 км.",
                            RoomsCount = 264,
                            Rate = 4.05,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Garden View Room",
                                Description = "Garden View Room - номер з видом на сад. У номерах king size bed або twin beds. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 45.5m,
                            },
                            new RoomType
                            {
                                Name = "Pool View Room",
                                Description = "Pool View Room - номер з видом на басейн. У номерах king size bed або twin beds. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 45.5m,
                            },
                             new RoomType
                            {
                                Name = "See View Room",
                                Description = "Pool View Room - номер з видом на море. У номерах king size bed або twin beds. Додаткове місце - розкладне односпальне ліжко.",
                                TotalArea = 45.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне односпальне ліжко",
                                Price = 45.5m,
                            }
                        });


                    regionName = "Сафага";
                    hotelName = "Coral Sun Beach";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodFoolBoard, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "safaga-coral-sun-beach",
                            Description = "Готель розташований в 22 км від м Сафага. Готель вперше розкрив свої двері гостям в 2011 році, останній ремонт був проведений в 2015 році. " +
                                                "Готель підійде для сімейного відпочинку, романтичних подорожей або для поїздки з друзями. Готель розташований в 80 км від аеропорту м Хургада.",
                            RoomsCount = 110,
                            Rate = 4.45,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на басейн і частковим видом на море. У номері king bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 47.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 42.2m,
                            },
                            new RoomType
                            {
                                Name = "Superior Room",
                                Description = "Superior Room - номер з видом на море. У номері king bed або twin beds і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 65.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 65.5m,
                            }
                        });

                    hotelName = "Menaville";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodUltraAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 4,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "safaga-menaville",
                            Description = "Готель розташований прямо на березі Червоного моря. " +
                                                "Відкритий в 1991 році, остання часткова реновація пройшла в 2010 році. " +
                                                "Підійде для сімейного, романтичного або молодіжного відпочинку. " +
                                                "Готель розташований в 45 км від аеропорту Хургади, в 8 км від міста Сафага і в 180 км від великого міста Луксора.",
                            RoomsCount = 301,
                            Rate = 4.08,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на околиці, гори, сад або море. Номери знаходяться в головній будівлі. У номері king bed або twin beds. Одне додаткове місце - розкладне ліжко.",
                                TotalArea = 32.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне ліжко",
                                Price = 44.0m,
                            },
                            new RoomType
                            {
                                Name = "Superior Room",
                                Description = "Superior Room - номер з видом на море. У номері king bed або twin beds. Одне додаткове місце - розкладне ліжко.",
                                TotalArea = 65.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "розкладне ліжко",
                                Price = 55.4m,
                            }
                        });


                    regionName = "Сахл Хашиш";
                    hotelName = "Oberoi";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodBreakfast, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sahl-hasheesh-oberoi",
                            Description = "Розташований на узбережжі Червоного моря The Oberoi, " +
                                                "Sahl Hasheesh являє собою ексклюзивний люкс-курорт. Готель розташовується на території в 48 акрів. " +
                                                "Торговий центр знаходяться в 25 хвилинах їзди від курортного готелю Oberoi Sahl Hasheesh. " +
                                                "Готель підійде для пляжного відпочинку з сім'єю. Готель розташований в 17 км від аеропорту, в 20 км від центру Хургади, " +
                                                "на самому березі моря.",
                            RoomsCount = 102,
                            Rate = 4.67,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Deluxe Suite",
                                Description = "Deluxe Suite - номер з видом на море або сад. Номер складається з вітальні, обідньої і спальної зон, розділених аркою. У номері king bed і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 85.0,
                                RoomsCount = 3,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 78.0m,
                            },
                            new RoomType
                            {
                                Name = "Superior Deluxe Suite",
                                Description = "Superior Deluxe Suite - номер з прямим видом на море, розташований перед пляжем. Номер складається з вітальні, обідньої і спальної зон розділених аркою. У номері king bed і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 85.0,
                                RoomsCount = 3,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 80.4m,
                            },
                            new RoomType
                            {
                                Name = "Grand Suite",
                                Description = "Grand Suite - номер з видом на сад або море і власним басейном з підігрівом в зимовий період. Номер складається з вітальні, обідньої і спальної зон розділених аркою. У номері king bed і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 125.0,
                                RoomsCount = 3,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 80.4m,
                            },
                            new RoomType
                            {
                                Name = "Royal Suite",
                                Description = "Royal Suite - королівський номер з видом на сад або море і власним басейном з підігрівом в зимовий період. Номер складається з вітальні, двох ванних кімнат, двох обідніх зони (всередині номера і біля басейну) і спальної зони розділених аркою. У номері king bed і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 225.0,
                                RoomsCount = 6,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 278.0m,
                            },
                        });

                    hotelName = "Ocean Breeze";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodFoolBoard, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sahl-hasheesh-ocean-breeze",
                            Description = "Апартаменти Ocean Breeze з власним пляжем і відкритим басейном розташовані на морському узбережжі в районі" +
                                                " Сахл-Хашіш міста Хургада в 17 км від зони для дайвінгу Малек-Дішан і в 23 км від зони для дайвінгу Абу-Хашиш. Готель був відкритий в 2018 році." +
                                                " Всього в готелі 439 номерів які розташовані в головній 6-ти поверховій будівлі, віллах і бунгало. У 23 км знаходиться затока Джетт-Макаді-Бей " +
                                                "і Центр дайвінгу Субаква Санрайз. Відстань до Міжнародного аеропорту Хургада становить 3 км",
                            RoomsCount = 98,
                            Rate = 3.99,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - номер в головній будівлі або в бунгало з видом на басейн або далеке море. У номері king size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 45.0,
                                 RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 38.0m,
                            },
                            new RoomType
                            {
                                Name = "Junior Suite",
                                Description = "Junior Suite - номер в головній будівлі або бунгало з видом на басейн або далеке море. У номері вітальня і спальня з king size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 65.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 40.4m,
                            },
                            new RoomType
                            {
                                Name = "Family (Executive) Suite",
                                Description = "Family (Executive) Suite - номер в головній будівлі або бунгало з видом на басейн або далеке море. У номері 2 спальні і вітальня. У спальні king size bed або twin beds.",
                                TotalArea = 90.0,
                                RoomsCount = 3,
                                PlacesCount = 4,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 95.0m,
                            }
                        });

                    hotelName = "Old Palace Resort";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sahl-hasheesh-old-palace-resort",
                            Description = "Готель розташований в Хургаді, в районі Саль-Хашиш, за Порожніми горами на приватному піщаному пляжі. Дата відкриття - 2008 рік, " +
                                                "дата останньої реставрації - 2011 р Недалеко від готелю розташований променад з магазинами та ресторанами. Готель підійде для сімейного, романтичного" +
                                                " або молодіжного відпочинку. Готель розташований в 23 км від аеропорту, в 25 км від центру Хургади.",
                            RoomsCount = 292,
                            Rate = 4.5,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - номер з видом на прилеглу територію, сад або басейн. У номері king-size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 37.0,
                                 RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 38.2m,
                            },
                            new RoomType
                            {
                                Name = "Superior Room",
                                Description = "Superior Room - номер з боковим видом на море. У номері king-size bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 37.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 40.2m,
                            },
                            new RoomType
                            {
                                Name = "Deluxe Room",
                                Description = "Deluxe Room - номер з видом на море. У номері king-size bed або twin beds і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 47.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 80.8m,
                            },
                            new RoomType
                            {
                                Name = "Chalet / Family Room",
                                Description = "Chalet / Family Room - сімейний номер з видом на сад, басейн або частковим видом на море. У номері king-size bed або twin beds і софа. Одне додаткове місце - односпальне ліжко. Номер розташований в додатковому корпусі.",
                                TotalArea = 60.0,
                                RoomsCount = 1,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 98.0m,
                            },
                             new RoomType
                            {
                                Name = "Junior Suite",
                                Description = "Junior Suite - номер з видом на море. У номері king-size bed. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 57.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 48.8m,
                            },
                            new RoomType
                            {
                                Name = "Suite",
                                Description = "Suite - номер з видом на сад або басейн, складається з двох кімнат. У номері king-size bed або twin beds і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 68.0,
                                RoomsCount = 2,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 58.0m,
                            }
                        });

                    hotelName = "Pyramisa";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodUltraAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sahl-hasheesh-pyramisa",
                            Description = "Готель розташований на піщаному пляжі в бухті Сахл Хашіш. " +
                                                "Побудований в 2007 році, остання реставрація проведена в 2014 році. " +
                                                "Складається з основного 2-, 3- і 4-поверхової будівлі (каскадом), додаткового 2-," +
                                                " 3- і 4-поверхового корпусу (каскадом) і трьох 2-поверхових вілл. Готель з сучасними і" +
                                                " стильними номерами пропонує своїм гостям чудовий пляж, ресторани на будь-який смак, " +
                                                "а також численні розважальні заходи. Підходить для сімейного відпочинку з дітьми, " +
                                                "а також для проведення конференцій. Готель розташований в 21 км від аеропорту, " +
                                                "в 24 км від центру Хургади, в 200 км від м Луксор, на самому березі моря.",
                            RoomsCount = 127,
                            Rate = 4.41,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Standard Room",
                                Description = "Standard Room - стандартний номер з видом на сад, басейн, море або бічним видом на море. У номері king bed або twin beds. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 40.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 36.6m,
                            },
                            new RoomType
                            {
                                Name = "Deluxe Room",
                                Description = "Deluxe Room - покращений номер з видом на море, складається з спальної кімнати і вітальні. У номері king-size bed або twin beds і софа. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 72.0,
                                RoomsCount = 2,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 81.8m,
                            },
                             new RoomType
                            {
                                Name = "Junior Suite",
                                Description = "Junior Suite - номер напівлюкс з видом на море, складається з спальної кімнати і вітальні. У номері king-size bed. Одне додаткове місце - односпальне ліжко.",
                                TotalArea = 93.0,
                                RoomsCount = 2,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 88.1m,
                            }
                        });

                    hotelName = "Sensimar Premier Le Reve Hotel";
                    SeedHotelsHelper(context, region, hotelFood = hotelFoodAllInclusive, hotelName,
                        new Hotel
                        {
                            Class = 5,
                            RegionId = region.Id,
                            Name = hotelName,
                            NormalizedName = "sahl-hasheesh-sensimar-premier-le-reve-hotel",
                            Description = "Готель розташований в районі Сахл Хашіш на Єгипетському узбережжі Червоного моря. " +
                                                "Відкритий в 2009 році, останній ремонт проведений в 2015 р. Готель приймає гостей старше 16 років. " +
                                                "Підійде для романтичного відпочинку, поїздки з друзями або для індивідуального подорожі. " +
                                                "У 22 км від аеропорту м Хургада, 25 км від м Хургада, в Сал Хашиш.",
                            RoomsCount = 339,
                            Rate = 4.82,
                            HotelFoodId = hotelFood.Id
                        },
                        new RoomType[]
                        {
                             new RoomType
                            {
                                Name = "Garden View Room",
                                Description = "Garden View Room - номер з видом на сад. У номері king size bed або twin beds. Додаткове місце - односпальне ліжко.",
                                TotalArea = 49.0,
                                RoomsCount = 1,
                                PlacesCount = 2,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 38.4m,
                            },
                            new RoomType
                            {
                                Name = "Pool View Room",
                                Description = "Pool View Room - номер з видом на басейн. У номері king size bed або twin beds. Додаткове місце - односпальне ліжко.",
                                TotalArea = 49.0,
                                RoomsCount = 2,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 38.4m,
                            },
                             new RoomType
                            {
                                Name = "Limited Sea View Room",
                                Description = "Limited Sea View Room - номер з частковим видом на море. У номері king size bed або twin beds. Додаткове місце - односпальне ліжко.",
                                 TotalArea = 49.0,
                                RoomsCount = 2,
                                PlacesCount = 3,
                                ExtraPlacesCount = 1,
                                ExtraBedType = "односпальне ліжко",
                                Price = 38.4m,
                            }
                        });
                }
            }
        }

        public static void SeedToursHelper(EFContext context, string regionName, string hotelName, string roomTypename, Tour tour)
        {
            var hotel = context
                .Hotels
                .Where(p => p.Name == hotelName)
                .Include(s => s.Region)
                .Where(p => p.Region.Name == regionName)
                .SingleOrDefault();

            if (hotel != null)
            {
                var roomType = context.RoomTypes.FirstOrDefault(r => r.HotelId == hotel.Id && r.Name == roomTypename);
                if (roomType != null)
                {
                    tour.Price = roomType.Price * tour.DaysCount * roomType.PlacesCount;
                    tour.RoomTypeId = roomType.Id;

                    if (tour.Discount!=0)
                    {
                        tour.DiscountPrice = tour.Price * (decimal)((100 - tour.Discount) * 0.01) ;
                    }

                    if (context.Tours.FirstOrDefault(f => f.CityDepartureId == tour.CityDepartureId && f.RoomTypeId == roomType.Id && f.DaysCount == tour.DaysCount && f.FromData == tour.FromData && f.Price == tour.Price) == null)
                    {
                        context.Tours.Add(tour);
                        context.SaveChanges();
                    }
                }
            }
        }

        public static void SeedTours(EFContext context)
        {
            var kyiv = context.CityDepartures.FirstOrDefault(c => c.Name == "Київ");
            var lviv = context.CityDepartures.FirstOrDefault(c => c.Name == "Львів");
            var odesa = context.CityDepartures.FirstOrDefault(c => c.Name == "Одеса");

            if (kyiv != null && lviv != null && odesa != null)
            {
                string regionName = "Марса Алам";
                string hotelName = "Akassia Club Calimera Swiss Resort";
                string roomType = "Standard Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount=10,
                    CityDepartureId = kyiv.Id,
                    DaysCount = 6,
                    FromData = new DateTime(2020, 05, 25, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Beach Front Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    CityDepartureId = lviv.Id,
                    DaysCount = 8,
                    FromData = new DateTime(2020, 05, 24, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Family Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 20,
                    CityDepartureId = odesa.Id,
                    DaysCount = 10,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });



                hotelName = "Aurora Bay Resort";
                roomType = "Classic Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    CityDepartureId = kyiv.Id,
                    DaysCount = 6,
                    FromData = new DateTime(2020, 05, 26, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Superior Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 30,
                    CityDepartureId = lviv.Id,
                    DaysCount = 8,
                    FromData = new DateTime(2020, 05, 27, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Family Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    CityDepartureId = odesa.Id,
                    DaysCount = 10,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });



                hotelName = "Aurora Nada Resort";
                roomType = "Standard Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 11,
                    CityDepartureId = kyiv.Id,
                    DaysCount = 6,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Family Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 19,
                    CityDepartureId = lviv.Id,
                    DaysCount = 8,
                    FromData = new DateTime(2020, 05, 29, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Suite";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 3,
                    CityDepartureId = odesa.Id,
                    DaysCount = 10,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });



                hotelName = "Bliss Abo Nawas";
                roomType = "Standard Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 15,
                    CityDepartureId = kyiv.Id,
                    DaysCount = 6,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Suite";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    CityDepartureId = lviv.Id,
                    DaysCount = 8,
                    FromData = new DateTime(2020, 05, 29, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });

                roomType = "Standard Room";
                SeedToursHelper(context, regionName, hotelName, roomType, new Tour
                {
                    Discount = 21,
                    CityDepartureId = odesa.Id,
                    DaysCount = 10,
                    FromData = new DateTime(2020, 05, 28, 22, 35, 5, new CultureInfo("uk-UA", false).Calendar)
                });
            }
        }

        public static void SeedParametersHotel(EFContext context)
        {
            string hotelName = "Akassia Club Calimera Swiss Resort";
            var hotel = context
                .Hotels
                .Where(p => p.Name == hotelName)
                .SingleOrDefault();

            if (hotel != null)
            {
                string[] Names = new string[] {
               "Розташування", "Пляж", "Номери", "Сервіси",
               "Спорт і розваги","Для дітей", "Харчування",
               "Спорт","Для дітей (послуги)", "Розваги", "Послуги в готелі",
               "Пляж (послуги)", "Готель" };

                Dictionary<string, string> descriptions = new Dictionary<string, string>();
                descriptions.Add("Розташування", "Розташований в 36 км від аеропорту м Марса Алам і в 165 км від аеропорту Хургади.");
                descriptions.Add("Пляж", "Піщано-кораловий пляж. Протяжність пляжу - 500 м. Рекомендується спеціальне взуття.");
                descriptions.Add("Номери", "У готелі " + hotel.RoomsCount.ToString() + " номери.");
                descriptions.Add("Сервіси", "Ресторани: Green House Restaurant (сніданок, обід і вечерю, шведський стіл) La Vista Restaurant (міжнародна кухня) Panorama Restaurant (місцева кухня) Beach BBQ Restaurant Бари: Lobby Bar Pool Bar Waves Beach Bar Scarabeo Beach Disco До послуг гостей: 6 басейнів ( 1 зі штучною хвилею, 2 з підігрівом в зимовий період, 1 олімпійський басейн");
                descriptions.Add("Спорт і розваги", "Освітлення тенісного корту (платно), катання на верблюдах (за додаткову плату), водне поло (безкоштовно), дартс (безкоштовно), бочче (безкоштовно), міні-футбол (безкоштовно), пірнання з аквалангом, 2 тенісних корти (з твердим покриттям , 1 - в LTI Akassia Beach Resort), стрільба з лука.");
                descriptions.Add("Для дітей", "6 водні гірки, 3 відкриті басейни (1 в LTI Akassia Beach Resort), 3 дитячі секції в басейні (1 в LTI Akassia Beach Resort), дитячий клуб (з 4 до 12 років), дитяча коляска.");

                Dictionary<string, List<string>> childrens = new Dictionary<string, List<string>>();
                childrens.Add("Харчування", new List<string> { "Кафе", "Ресторан" });
                childrens.Add("Розваги", new List<string> { "SPA", "Сауна/Лазня $", "Джакузі",
                "Дискотека","Водні гірки","Музика","Масаж $","Відкритий басейн","Аніматори"});
                childrens.Add("Для дітей (послуги)", new List<string> { "Дитячий басейн", "Послуги няні $",
                "Дитяча площадка","Дитячі стільчики в ресторані","Дитяча кімната","Дитяче ліжко"});
                childrens.Add("Спорт", new List<string> { "Більярд $", "Фітнес", "Аеробіка", "Настільний теніс",
                "Волейбол","Аквапарк","Тенісний корт","Верхова їзда $","Дайвінг $"});
                childrens.Add("Пляж (послуги)", new List<string> { "Власний пляж", "Понтон", "Пляжні рушники",
                "Піщано-гальковий пляж","Шезлонги","Пляжні парасольки"});
                childrens.Add("Готель", new List<string> { "Вид на басейн", "Вид на море", "Вид на територію" });
                childrens.Add("Послуги в готелі", new List<string> { "Конференц зал", "Банкомат", "Холодильник", "Сервіс для бізнеса $",
                "Лікар $","Фен","Парковка","Ванна чи душ","Сейф","Wi-Fi","TV","Інтернет","Обмін валют","Телефон"});

                int priority = 1;
                for (int i = 0; i < Names.Length; i++)
                {
                    if (context.Parameters.FirstOrDefault(f => f.HotelId == hotel.Id && f.ParentId == null && f.Name == Names[i]) == null)
                    {
                        context.Parameters.Add(
                            new Parameter
                            {
                                Name = Names[i],
                                Description = descriptions.ContainsKey(Names[i]) ? descriptions[Names[i]] : "",
                                Priority = priority++,
                                HotelId = hotel.Id,
                                ParentId = null

                            });
                        context.SaveChanges();
                    }
                }

                long parentId;
                foreach (KeyValuePair<string, List<string>> keyValue in childrens)
                {
                    priority = 1;
                    parentId = context.Parameters.FirstOrDefault(f => f.HotelId == hotel.Id && f.ParentId == null && f.Name == keyValue.Key).Id;
                    foreach (var item in keyValue.Value)
                    {
                        if (context.Parameters.FirstOrDefault(f => f.HotelId == hotel.Id && f.ParentId != null && f.Name == item) == null)
                        {
                            context.Parameters.Add(
                            new Parameter
                            {
                                Name = item,
                                Description = item,
                                Priority = priority++,
                                HotelId = hotel.Id,
                                ParentId = parentId

                            });
                            context.SaveChanges();
                        }
                    }
                }
            }
        }


        public static void SeedHotelImages(EFContext context, IHostingEnvironment env,
            IConfiguration config)
        {
            var _fileDestDir = Path.Combine(env.ContentRootPath, config.GetValue<string>("ImagesPath"));
            string[] imageSizes = ((string)config.GetValue<string>("ImagesSizes")).Split(" ");

            foreach (var hotel in context.Hotels)
            {
                string folder = Path.Combine(_fileDestDir, hotel.NormalizedName);

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string[] files = Directory.GetFiles(folder);

                foreach (string s in files)
                {
                    var filename = Path.GetFileName(s);

                    foreach (var item in imageSizes)
                    {
                        if (filename.StartsWith(item))
                        {
                            filename = filename.Replace(item + "_", "");
                        }
                    }

                    if (context.HotelImages.FirstOrDefault(f => f.HotelId == hotel.Id && f.HotelImageUrl == filename) == null)
                    {
                        var hotelImage = new HotelImage()
                        {
                            HotelId = hotel.Id,
                            HotelImageUrl = filename
                        };
                        context.HotelImages.Add(hotelImage);
                        context.SaveChanges();
                    }
                }
            }
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
                    AvatarUrl = "1e55aeb8.jpg",
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
                SeederDB.SeedHotelFoods(context);
                SeederDB.SeedCityDepartures(context);
                SeederDB.SeedHotels(context);
                SeederDB.SeedTours(context);
                SeederDB.SeedFilters(context);
                SeederDB.SeedHotelImages(context, env, config);
                SeederDB.SeedParametersHotel(context);
            }
        }
    }
}
