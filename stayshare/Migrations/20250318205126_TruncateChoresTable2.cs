using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class TruncateChoresTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Chores");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
