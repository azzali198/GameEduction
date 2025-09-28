using PhysicsGame.BL.Models;
using PhysicsGame.DAL.Context;
using PhysicsGame.DAL.Entities;

public interface IConnectionService
{
    Task AddConnectionAsync(ConnectionModel input);
}

public class ConnectionService : IConnectionService
{
    private readonly PhysicsGameContext _context;

    public ConnectionService(PhysicsGameContext context)
    {
        _context = context;
    }

    public async Task AddConnectionAsync(ConnectionModel input)
    {
        var connection = new Connections
        {
            Login = input.Login,
            Email = input.Email,
            Date = input.Date,
            ScorePhysics = input.ScorePhysics,
            ScoreChemistry = input.ScoreChemistry
        };
        await _context.Connections.AddAsync(connection);
        await _context.SaveChangesAsync();
    }
}