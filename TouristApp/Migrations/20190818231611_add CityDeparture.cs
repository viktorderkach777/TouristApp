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
                value: new DateTime(2019, 8, 19, 2, 16, 10, 872, DateTimeKind.Local).AddTicks(259));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2",
                column: "FromData",
                value: new DateTime(2019, 8, 19, 2, 16, 10, 872, DateTimeKind.Local).AddTicks(5324));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3",
                column: "FromData",
                value: new DateTime(2019, 8, 19, 2, 16, 10, 872, DateTimeKind.Local).AddTicks(5329));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "1",
                column: "FromData",
                value: new DateTime(2019, 8, 19, 2, 14, 18, 138, DateTimeKind.Local).AddTicks(1389));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2",
                column: "FromData",
                value: new DateTime(2019, 8, 19, 2, 14, 18, 138, DateTimeKind.Local).AddTicks(7825));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3",
                column: "FromData",
                value: new DateTime(2019, 8, 19, 2, 14, 18, 138, DateTimeKind.Local).AddTicks(7830));
        }
    }
}
