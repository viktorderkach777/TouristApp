using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristApp.Migrations
{
    public partial class addCityDeparture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "1",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 50, 5, 764, DateTimeKind.Local).AddTicks(2627));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 50, 5, 764, DateTimeKind.Local).AddTicks(8839));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 50, 5, 764, DateTimeKind.Local).AddTicks(8844));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "1",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 48, 15, 185, DateTimeKind.Local).AddTicks(9166));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 48, 15, 186, DateTimeKind.Local).AddTicks(5427));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3",
                column: "FromData",
                value: new DateTime(2019, 8, 18, 22, 48, 15, 186, DateTimeKind.Local).AddTicks(5435));
        }
    }
}
