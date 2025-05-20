using Microsoft.AspNetCore.Mvc;

namespace MyPhysicsApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to the Physics API!");
        }

        [HttpGet("about")]
        public IActionResult About()
        {
            return Ok("This is a Physics education API");
        }
    }
}