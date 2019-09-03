using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristApp.Migrations
{
    public partial class AddtblRefreshTokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblRefreshTokens",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Token = table.Column<string>(maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblRefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblRefreshTokens_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "1",
                column: "FromData",
                value: new DateTime(1979, 7, 28, 22, 35, 5, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "2",
                column: "FromData",
                value: new DateTime(1979, 7, 28, 22, 35, 5, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Tours",
                keyColumn: "Id",
                keyValue: "3",
                column: "FromData",
                value: new DateTime(1979, 7, 28, 22, 35, 5, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblRefreshTokens");

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
    }
}
