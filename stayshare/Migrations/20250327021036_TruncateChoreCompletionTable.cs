using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class TruncateChoreCompletionTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions");

            migrationBuilder.DropIndex(
                name: "IX_ChoreCompletions_ResidentChoresId",
                table: "ChoreCompletions");

            migrationBuilder.Sql("TRUNCATE TABLE `ChoreCompletions`;");

            migrationBuilder.CreateIndex(
                name: "IX_ChoreCompletions_ResidentChoresId_SpecificAssignedDate",
                table: "ChoreCompletions",
                columns: new[] { "ResidentChoresId", "SpecificAssignedDate" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions",
                column: "ResidentChoresId",
                principalTable: "ResidentChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions");

            migrationBuilder.DropIndex(
                name: "IX_ChoreCompletions_ResidentChoresId_SpecificAssignedDate",
                table: "ChoreCompletions");

            migrationBuilder.CreateIndex(
                name: "IX_ChoreCompletions_ResidentChoresId",
                table: "ChoreCompletions",
                column: "ResidentChoresId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions",
                column: "ResidentChoresId",
                principalTable: "ResidentChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
