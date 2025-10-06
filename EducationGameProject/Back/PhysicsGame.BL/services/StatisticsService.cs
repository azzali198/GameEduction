using Microsoft.EntityFrameworkCore;
using PhysicsGame.DAL.Context;

namespace PhysicsGame.BL.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly PhysicsGameContext _context;

        public StatisticsService(PhysicsGameContext context)
        {
            _context = context;
        }

        public async Task<List<ConnectionsByDateModel>> GetConnectionsCountByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Connections
                .Where(c => c.Date.Date >= startDate.Date && c.Date.Date <= endDate.Date)
                .GroupBy(c => c.Date.Date)
                .Select(g => new ConnectionsByDateModel
                {
                    Date = g.Key,
                    ConnectionsCount = g.Count()
                })
                .OrderBy(x => x.Date)
                .ToListAsync();
        }

        public async Task<List<ConnectionsByCountryModel>> GetConnectionsCountByCountryAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Connections
                .Where(c => c.Date.Date >= startDate.Date && c.Date.Date <= endDate.Date)
                .Join(_context.Users, 
                      c => c.Login, 
                      u => u.UserName, 
                      (c, u) => new { Connection = c, User = u })
                .GroupBy(x => x.User.Country)
                .Select(g => new ConnectionsByCountryModel
                {
                    Country = g.Key ?? "Unknown",
                    ConnectionsCount = g.Count()
                })
                .OrderByDescending(x => x.ConnectionsCount)
                .ToListAsync();
        }
    }
    public interface IStatisticsService
{
    Task<List<ConnectionsByDateModel>> GetConnectionsCountByDateRangeAsync(DateTime startDate, DateTime endDate);
    Task<List<ConnectionsByCountryModel>> GetConnectionsCountByCountryAsync(DateTime startDate, DateTime endDate);
}

public class ConnectionsByDateModel
{
    public DateTime Date { get; set; }
    public int ConnectionsCount { get; set; }
}

public class ConnectionsByCountryModel
{
    public string Country { get; set; }
    public int ConnectionsCount { get; set; }
}
}