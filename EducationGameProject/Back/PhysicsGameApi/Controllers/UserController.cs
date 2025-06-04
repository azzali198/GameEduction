using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PhysicsGame.DAL.Entities;
using PhysicsGame.BL;
using Microsoft.AspNetCore.Cors;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [EnableCors()]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }
           
        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe(User user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest("User cannot be null");
                }

                await _userService.SubscribeUser(user);
                return Ok(new { message = "User subscribed successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}