using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MyCalculation.Migrations
{
    public partial class Userdbv3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SignUpTime",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignUpTime",
                table: "AspNetUsers");
        }
    }
}
