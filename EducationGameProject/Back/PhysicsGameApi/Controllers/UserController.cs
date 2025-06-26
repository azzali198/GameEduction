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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (request == null || string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password))
                {
                    return BadRequest("Username and password are required");
                }

                var loginResponse = await _userService.LoginUser(request.UserName, request.Password);
                return Ok(new { 
                    message = "Login successful", 
                    token = loginResponse.Token,
                    user = new {
                        id = loginResponse.User.IdUser,
                        userName = loginResponse.User.UserName,
                        email = loginResponse.User.Email,
                        country = loginResponse.User.Country,
                        profession = loginResponse.User.Profession
                        // Don't include sensitive data like password
                    }
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }

    public class LoginRequest
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}