using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class AddResidenceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ResidenceId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Residences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ResidenceName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AdminId = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Residences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Residences_AspNetUsers_AdminId",
                        column: x => x.AdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ResidenceId",
                table: "AspNetUsers",
                column: "ResidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Residences_AdminId",
                table: "Residences",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Residences_ResidenceId",
                table: "AspNetUsers",
                column: "ResidenceId",
                principalTable: "Residences",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Residences_ResidenceId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Residences");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ResidenceId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ResidenceId",
                table: "AspNetUsers");
        }
    }
}
