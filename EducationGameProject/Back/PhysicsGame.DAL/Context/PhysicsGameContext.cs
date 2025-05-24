using Microsoft.EntityFrameworkCore;
using PhysicsGame.DAL.Entities;

namespace PhysicsGame.DAL.Context
{
    public class PhysicsGameContext : DbContext
    {
        public PhysicsGameContext(DbContextOptions<PhysicsGameContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Mechanics> Mechanics { get; set; }
        public DbSet<Thermodynamics> Thermodynamics { get; set; }
        public DbSet<Optics> Optics { get; set; }
        public DbSet<ModernPhysics> ModernPhysics { get; set; }
        public DbSet<Relativity> Relativity { get; set; }
        public DbSet<Connections> Connections { get; set; }
        public DbSet<Feedbacks> Feedbacks { get; set; }
        public DbSet<Chemistry> Chemistry { get; set; }
        public DbSet<Electromagnetism> Electromagnetism { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser);
                
                entity.Property(e => e.Email)
                    .IsRequired();

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.UserName)
                    .IsRequired();
            });

            modelBuilder.Entity<Mechanics>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<Thermodynamics>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<Optics>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<ModernPhysics>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<Relativity>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });

            modelBuilder.Entity<Connections>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Login)
                    .HasColumnName("login");

                entity.Property(e => e.Email)
                    .HasColumnName("email");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.ScorePhysics)
                    .HasColumnName("scorePhysics");

                entity.Property(e => e.ScoreChemistry)
                    .HasColumnName("scoreChemistry");
            });

            modelBuilder.Entity<Feedbacks>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Login)
                    .HasColumnName("login");

                entity.Property(e => e.Email)
                    .HasColumnName("email");

                entity.Property(e => e.FeedbackText)
                    .HasColumnName("feedbackText");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Chemistry>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Definition)
                    .HasColumnName("definition");

                entity.Property(e => e.ChemicalData)
                    .HasColumnName("chemicalData");

                entity.Property(e => e.RightResponse)
                    .HasColumnName("right_reponse");

                entity.Property(e => e.ResponseText)
                    .HasColumnName("responseText");
            });

            modelBuilder.Entity<Electromagnetism>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Identifier)
                    .IsRequired();

                entity.Property(e => e.QuestionEn)
                    .HasColumnName("question_en");

                entity.Property(e => e.ResponseAEn)
                    .HasColumnName("response_A_en");

                entity.Property(e => e.ResponseBEn)
                    .HasColumnName("response_B_en");

                entity.Property(e => e.ResponseCEn)
                    .HasColumnName("response_C_en");

                entity.Property(e => e.RightResponseEn)
                    .HasColumnName("right_response_en");

                entity.Property(e => e.QuestionFr)
                    .HasColumnName("question_fr");

                entity.Property(e => e.ResponseAFr)
                    .HasColumnName("response_A_fr");

                entity.Property(e => e.ResponseBFr)
                    .HasColumnName("response_B_fr");

                entity.Property(e => e.ResponseCFr)
                    .HasColumnName("response_C_fr");

                entity.Property(e => e.RightResponseFr)
                    .HasColumnName("right_response_fr");

                entity.Property(e => e.Image)
                    .HasColumnName("image");
            });
        }
    }
}