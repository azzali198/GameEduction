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
            Email = _context.Users.FirstOrDefault(c => c.UserName == input.Login)?.Email ?? "",
            Date = input.Date,
            ScorePhysics = input.ScorePhysics,
            ScoreChemistry = input.ScoreChemistry
        };
        var existingConnection = _context.Connections
            .FirstOrDefault(c => c.Login == input.Login && c.Date.Date == input.Date.Date);
        if (existingConnection == null)
        {
            await _context.Connections.AddAsync(connection);
        }
        else
        {
            if(!string.IsNullOrEmpty(input.ScorePhysics))
               existingConnection.ScorePhysics = input.ScorePhysics;

            if(!string.IsNullOrEmpty(input.ScoreChemistry))
               existingConnection.ScoreChemistry = input.ScoreChemistry;

            _context.Connections.Update(existingConnection);
        }
        await _context.SaveChangesAsync();
    }
}