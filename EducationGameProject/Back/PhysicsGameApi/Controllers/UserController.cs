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
                    isAdmin = loginResponse.IsAdmin,
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

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Request body is required");
                }

                await _userService.ResetForgottenPasswordAsync(request.Email, request.NewPassword);
                return Ok(new { message = "Password updated successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpGet("get-all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("activate-user/{userId}")]
        public async Task<IActionResult> ActivateUser(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest("Invalid user ID");
                }

                await _userService.ActivateUserAsync(userId);
                return Ok(new { message = "User activated successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpPut("deactivate-user/{userId}")]
        public async Task<IActionResult> DeactivateUser(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest("Invalid user ID");
                }

                await _userService.DeactivateUserAsync(userId);
                return Ok(new { message = "User deactivated successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpDelete("delete-user/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest("Invalid user ID");
                }

                await _userService.DeleteUserAsync(userId);
                return Ok(new { message = "User deleted successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpGet("get-user/{userName}")]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(userName))
                {
                    return BadRequest("Username is required");
                }

                var user = await _userService.GetUserByUserNameAsync(userName);
                
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(new {
                    id = user.IdUser,
                    userName = user.UserName,
                    email = user.Email,
                    country = user.Country,
                    profession = user.Profession,
                    dateOfBirth = user.DateOfBirth,
                    actif = user.Actif
                    // Don't include sensitive data like password
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        [HttpPut("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] User userInput)
        {
            try
            {
                if (userInput == null)
                {
                    return BadRequest("User data is required");
                }

                if (string.IsNullOrWhiteSpace(userInput.UserName))
                {
                    return BadRequest("Username is required");
                }

                var updatedUser = await _userService.UpdateUserAsync(userInput);
                
                if (updatedUser == null)
                {
                    return NotFound("User not found");
                }

                return Ok(new {
                    message = "User updated successfully",
                    user = new {
                        id = updatedUser.IdUser,
                        userName = updatedUser.UserName,
                        email = updatedUser.Email,
                        country = updatedUser.Country,
                        profession = updatedUser.Profession,
                        dateOfBirth = updatedUser.DateOfBirth,
                        actif = updatedUser.Actif
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
                return NotFound(ex.Message);
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

    public class ForgotPasswordRequest
    {
        public required string Email { get; set; }
        public required string NewPassword { get; set; }
    }
}
