using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristApp.Migrations
{
    public partial class AddinitialDataConfiguration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Class",
                table: "Hotels",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { "1", "Poland" },
                    { "30", "Slovakia" },
                    { "29", "Netherlands" },
                    { "28", "Moldova" },
                    { "27", "Latvia" },
                    { "26", "Kazakhstan" },
                    { "25", "Japan" },
                    { "24", "Italy" },
                    { "23", "Israel" },
                    { "22", "Ireland" },
                    { "21", "Iceland" },
                    { "20", "Greece" },
                    { "19", "France" },
                    { "18", "Finland" },
                    { "17", "Estonia" },
                    { "16", "Egypt" },
                    { "15", "Denmark" },
                    { "14", "Czech Republic" },
                    { "13", "Croatia" },
                    { "12", "China" },
                    { "11", "Chile" },
                    { "10", "Canada" },
                    { "9", "Bosnia and Herzegovina" },
                    { "8", "Belgium" },
                    { "7", "Australia" },
                    { "6", "UK" },
                    { "5", "USA" },
                    { "4", "Ukraine" },
                    { "3", "Germany" },
                    { "2", "Russia" },
                    { "31", "Slovenia" },
                    { "32", "Spain" }
                });

            migrationBuilder.InsertData(
                table: "Regions",
                columns: new[] { "Id", "CountryId", "Name" },
                values: new object[,]
                {
                    { "2", "1", "Krakow" },
                    { "3", "1", "Wroclaw" },
                    { "1", "16", "Шарм Эль Шейх" }
                });

            migrationBuilder.InsertData(
                table: "Hotels",
                columns: new[] { "Id", "Class", "Description", "Name", "Price", "Rate", "RegionId", "RoomsCount" },
                values: new object[,]
                {
                    { "1", 4, "Отель расположен в районе Хадаба курорта Шарм-Эль-Шейх на берегу Красного моря. Был открыт в 1996 году. Реновации в отеле не было, только косметический поточный ремонт. Состоит из основного 2-этажного здания (без номеров) и комплекса 2-этажных корпусов. Коралловый пляж отеля граничит с уникальными коралловыми рифами. Рядом возле отеля находится развлекательный центр Alf Leila Wa Leila, а торговые ряды Il Merkato и Old Market порадуют любителей шопинга и местного колорита. Отель расположен в 22 км от международного аэропорта Шарм-эль-Шейх в районе Hadaba | Ras Um El Sid. Расстояние до Naama Bay: 7 км; Расстояние до Old Market (Старый Город): 4 км; Расстояние до Soho Square: 20 км.", "Royal Paradise Resort", 550m, 5.0, "1", 286 },
                    { "2", 3, "Отель находится в районе Рас Умм Элсид в Шарм-эль-Шейхе. В 8 км расположена набережная Наама-Бэй со множеством ресторанов и магазинов. Гостиница впервые распахнула свои двери гостям в 1999 году, последняя реновация проводилась в 2014 году. Отель подойдет для молодежного, романтического или индивидуального отдыха. В 18 км от аэропорта г. Шарм-эль-Шейх.", "Amar Sina", 572m, 3.6099999999999999, "1", 98 },
                    { "3", 5, "Отель расположен в Хадабет Ом Эль Сид, в самом центре променада Эль Меркато, на курорте Шарм-эль-Шейх, рядом с побережьем Красного моря. Отель был открыт в 2010 году, последняя реновация проводилась в 2018 году (обновление мебели на территории отеля, обновление бассейнов и номеров категории Deluxe). Отель подойдет для семейного, романтического или молодежного отдыха. Отель расположен в 17 км от аэропорта города Шарм Эль Шейх.", "Il Mercato Hotel (ex.Iberotel Il Mercato)", 675m, 4.5199999999999996, "1", 318 }
                });

            migrationBuilder.InsertData(
                table: "Tours",
                columns: new[] { "Id", "DaysCount", "FromData", "HotelId", "Price" },
                values: new object[,]
                {
                    { "1", 6, new DateTime(2019, 8, 11, 23, 42, 21, 76, DateTimeKind.Local).AddTicks(7293), "1", 3300m },
                    { "2", 8, new DateTime(2019, 8, 11, 23, 42, 21, 77, DateTimeKind.Local).AddTicks(3748), "2", 4400m },
                    { "3", 10, new DateTime(2019, 8, 11, 23, 42, 21, 77, DateTimeKind.Local).AddTicks(3754), "2", 5500m }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "10");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "11");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "12");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "13");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "14");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "15");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "17");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "18");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "19");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "20");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "21");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "22");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "23");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "24");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "25");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "26");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "27");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "28");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "29");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "30");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "31");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "32");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "4");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "5");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "6");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "7");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "8");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "9");

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "Regions",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Regions",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Hotels",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Regions",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: "16");

            migrationBuilder.DropColumn(
                name: "Class",
                table: "Hotels");
        }
    }
}
