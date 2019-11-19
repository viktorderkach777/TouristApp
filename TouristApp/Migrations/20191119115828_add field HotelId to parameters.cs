using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristApp.Migrations
{
    public partial class addfieldHotelIdtoparameters : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HotelId",
                table: "tblParameters",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblParameters_HotelId",
                table: "tblParameters",
                column: "HotelId");

            migrationBuilder.AddForeignKey(
                name: "FK_tblParameters_Hotels_HotelId",
                table: "tblParameters",
                column: "HotelId",
                principalTable: "Hotels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblParameters_Hotels_HotelId",
                table: "tblParameters");

            migrationBuilder.DropIndex(
                name: "IX_tblParameters_HotelId",
                table: "tblParameters");

            migrationBuilder.DropColumn(
                name: "HotelId",
                table: "tblParameters");
        }
    }
}
