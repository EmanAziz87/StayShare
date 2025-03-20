using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class TruncateChoresTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("TRUNCATE TABLE Chores");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
