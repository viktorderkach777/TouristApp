using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TouristApp.Migrations
{
    public partial class addparametertable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblParameters",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Description = table.Column<string>(maxLength: 2000, nullable: false),
                    Priority = table.Column<int>(nullable: false),
                    ParentId = table.Column<long>(nullable: true),
                    HotelId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblParameters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblParameters_Hotels_HotelId",
                        column: x => x.HotelId,
                        principalTable: "Hotels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblParameters_tblParameters_ParentId",
                        column: x => x.ParentId,
                        principalTable: "tblParameters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblParameters_HotelId",
                table: "tblParameters",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_tblParameters_ParentId",
                table: "tblParameters",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblParameters");
        }
    }
}
