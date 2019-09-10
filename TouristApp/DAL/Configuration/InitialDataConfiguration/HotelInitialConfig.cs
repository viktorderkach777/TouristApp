using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TouristApp.DAL.Entities;

namespace TouristApp.DAL.Configuration.InitialDataConfiguration
{
    class HotelInitialConfig : IEntityTypeConfiguration<Hotels>
    {
        public void Configure(EntityTypeBuilder<Hotels> builder)
        {
            int hotelId = 0;
            Hotels[] hotels = new Hotels[]
            {
                 new Hotels
                 {
                     Id=(++hotelId).ToString(),
                     Class=4,
                     RegionId="1",
                     Name="Royal Paradise Resort",
                     Description="Отель расположен в районе Хадаба курорта Шарм-Эль-Шейх на берегу Красного моря." +
                     " Был открыт в 1996 году. Реновации в отеле не было, только косметический поточный ремонт. " +
                     "Состоит из основного 2-этажного здания (без номеров) и комплекса 2-этажных корпусов. Коралловый" +
                     " пляж отеля граничит с уникальными коралловыми рифами. Рядом возле отеля находится развлекательный " +
                     "центр Alf Leila Wa Leila, а торговые ряды Il Merkato и Old Market порадуют любителей шопинга и местного" +
                     " колорита. Отель расположен в 22 км от международного аэропорта Шарм-эль-Шейх в районе Hadaba | Ras Um El" +
                     " Sid. Расстояние до Naama Bay: 7 км; Расстояние до Old Market (Старый Город): 4 км; Расстояние до Soho Square: 20 км.",
                     RoomsCount=286,
                     Rate=5.0,
                     Price=550
                 },
                 new Hotels
                 {
                     Id=(++hotelId).ToString(),
                     Class=3,
                     RegionId="1",
                     Name="Amar Sina",
                     Description="Отель находится в районе Рас Умм Элсид в Шарм-эль-Шейхе. В 8 км расположена набережная Наама-Бэй" +
                     " со множеством ресторанов и магазинов. Гостиница впервые распахнула свои двери гостям в 1999 году, последняя" +
                     " реновация проводилась в 2014 году. Отель подойдет для молодежного, романтического или индивидуального отдыха." +
                     " В 18 км от аэропорта г. Шарм-эль-Шейх.",
                     RoomsCount=98,
                     Rate=3.61,
                     Price=572
                 },
                 new Hotels
                 {
                     Id=(++hotelId).ToString(),
                     Class=5,
                     RegionId="1",
                     Name="Il Mercato Hotel (ex.Iberotel Il Mercato)",
                     Description="Отель расположен в Хадабет Ом Эль Сид, в самом центре променада Эль Меркато, на курорте Шарм-эль-Шейх," +
                     " рядом с побережьем Красного моря. Отель был открыт в 2010 году, последняя реновация проводилась в 2018 году " +
                     "(обновление мебели на территории отеля, обновление бассейнов и номеров категории Deluxe). Отель подойдет для семейного," +
                     " романтического или молодежного отдыха. Отель расположен в 17 км от аэропорта города Шарм Эль Шейх.",
                     RoomsCount=318,
                     Rate=4.52,
                     Price=675
                 }
                };
            builder.HasData(hotels);
        }
    }
}
