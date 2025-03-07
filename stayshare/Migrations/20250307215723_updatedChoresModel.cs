using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stayshare.Migrations
{
    /// <inheritdoc />
    public partial class updatedChoresModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateToComplete",
                table: "Chores",
                newName: "StartDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompleteBy",
                table: "Chores",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TaskName",
                table: "Chores",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompleteBy",
                table: "Chores");

            migrationBuilder.DropColumn(
                name: "TaskName",
                table: "Chores");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Chores",
                newName: "DateToComplete");
        }
    }
}
