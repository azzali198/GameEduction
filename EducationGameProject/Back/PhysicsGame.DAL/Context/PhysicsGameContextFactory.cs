using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace PhysicsGame.DAL.Context
{
    public class PhysicsGameContextFactory : IDesignTimeDbContextFactory<PhysicsGameContext>
    {
        public PhysicsGameContext CreateDbContext(string[] args)
        {
            // Build configuration to read appsettings.json
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "PhysicsGameApi"))
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<PhysicsGameContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new PhysicsGameContext(optionsBuilder.Options);
        }
    }
}