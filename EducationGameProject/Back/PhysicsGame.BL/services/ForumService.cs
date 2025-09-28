using System.ComponentModel;
using PhysicsGame.BL.Models;
using PhysicsGame.DAL.Context;
using PhysicsGame.DAL.Entities;

public interface IForumService
{
    Task AddFeedbackAsync(FeedbackInput input);
    Task<List<Feedbacks>> GetAllFeedbacksAsync();
}

public class ForumService : IForumService
{
    private readonly PhysicsGameContext _context;

    public ForumService(PhysicsGameContext context)
    {
        _context = context;
    }

    public async Task AddFeedbackAsync(FeedbackInput input)
    {
        var feedback = new Feedbacks
        {
            Login = input.Login,
            FeedbackText = input.FeedbackText,
            Email = _context.Users.FirstOrDefault(u => u.UserName == input.Login)?.Email ?? "",
            Date = DateTime.Now// Only the date part
        };


        await _context.Feedbacks.AddAsync(feedback);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Feedbacks>> GetAllFeedbacksAsync()
    {
        return await Task.FromResult(_context.Feedbacks.ToList());
    }
}