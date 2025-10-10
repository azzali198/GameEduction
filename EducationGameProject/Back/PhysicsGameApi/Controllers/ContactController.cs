using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PhysicsGame.BL.Services;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail([FromBody] ContactEmailModel request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Contact information is required");
                }

                if (string.IsNullOrWhiteSpace(request.Name) || 
                    string.IsNullOrWhiteSpace(request.EmailAddress) ||
                    string.IsNullOrWhiteSpace(request.Subject) ||
                    string.IsNullOrWhiteSpace(request.Message))
                {
                    return BadRequest("Name, email address, subject, and message are required");
                }

                await _contactService.SendContactEmailAsync(request);
                return Ok(new { message = "Email sent successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email: {ex.Message}");
            }
        }
    }
}