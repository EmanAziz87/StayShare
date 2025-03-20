using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class ManyToManyAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "ResidentChores");

            migrationBuilder.AddColumn<int>(
                name: "CompletionCount",
                table: "ResidentChores",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletionCount",
                table: "ResidentChores");

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "ResidentChores",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
