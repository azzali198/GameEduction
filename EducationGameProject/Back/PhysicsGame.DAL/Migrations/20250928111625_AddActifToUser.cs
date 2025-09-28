using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhysicsGame.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddActifToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Actif",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Actif",
                table: "Users");
        }
    }
}
