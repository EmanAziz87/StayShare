using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class AddedChoreCompletionTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChoreCompletion_ResidentChores_ResidentChoresId",
                table: "ChoreCompletion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChoreCompletion",
                table: "ChoreCompletion");

            migrationBuilder.DropColumn(
                name: "DateCompleted",
                table: "ChoreCompletion");

            migrationBuilder.RenameTable(
                name: "ChoreCompletion",
                newName: "ChoreCompletions");

            migrationBuilder.RenameIndex(
                name: "IX_ChoreCompletion_ResidentChoresId",
                table: "ChoreCompletions",
                newName: "IX_ChoreCompletions_ResidentChoresId");

            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "ChoreCompletions",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChoreCompletions",
                table: "ChoreCompletions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions",
                column: "ResidentChoresId",
                principalTable: "ResidentChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChoreCompletions_ResidentChores_ResidentChoresId",
                table: "ChoreCompletions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChoreCompletions",
                table: "ChoreCompletions");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "ChoreCompletions");

            migrationBuilder.RenameTable(
                name: "ChoreCompletions",
                newName: "ChoreCompletion");

            migrationBuilder.RenameIndex(
                name: "IX_ChoreCompletions_ResidentChoresId",
                table: "ChoreCompletion",
                newName: "IX_ChoreCompletion_ResidentChoresId");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCompleted",
                table: "ChoreCompletion",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChoreCompletion",
                table: "ChoreCompletion",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChoreCompletion_ResidentChores_ResidentChoresId",
                table: "ChoreCompletion",
                column: "ResidentChoresId",
                principalTable: "ResidentChores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
