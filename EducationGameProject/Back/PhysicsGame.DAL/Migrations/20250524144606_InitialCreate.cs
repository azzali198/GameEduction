using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhysicsGame.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chemistry",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    definition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    chemicalData = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_reponse = table.Column<int>(type: "int", nullable: false),
                    responseText = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chemistry", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Connections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date = table.Column<DateTime>(type: "datetime", nullable: false),
                    scorePhysics = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    scoreChemistry = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Connections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Electromagnetism",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electromagnetism", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    login = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    feedbackText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    date = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mechanics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mechanics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ModernPhysics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModernPhysics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Optics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Optics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Relativity",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Relativity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Thermodynamics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Identifier = table.Column<int>(type: "int", nullable: false),
                    question_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_en = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    question_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_A_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_B_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    response_C_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    right_response_fr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thermodynamics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    IdUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: false),
                    Profession = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.IdUser);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chemistry");

            migrationBuilder.DropTable(
                name: "Connections");

            migrationBuilder.DropTable(
                name: "Electromagnetism");

            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "Mechanics");

            migrationBuilder.DropTable(
                name: "ModernPhysics");

            migrationBuilder.DropTable(
                name: "Optics");

            migrationBuilder.DropTable(
                name: "Relativity");

            migrationBuilder.DropTable(
                name: "Thermodynamics");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
