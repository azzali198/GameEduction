using Microsoft.AspNetCore.Mvc;
using PhysicsGame.BL.Models;
using PhysicsGame.BL.Services;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ForumController : ControllerBase
    {
        private readonly IForumService _forumService;

        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpPost("add-feedback")]
        public async Task<IActionResult> AddFeedback([FromBody] FeedbackInput input)
        {
            if (input == null || string.IsNullOrWhiteSpace(input.Login) || string.IsNullOrWhiteSpace(input.FeedbackText))
                return BadRequest("Login and feedback text are required.");

            try
            {
                await _forumService.AddFeedbackAsync(input);
                return Ok(new { message = "Feedback saved successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-feedbacks")]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _forumService.GetAllFeedbacksAsync();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

  
}