using Microsoft.AspNetCore.Mvc;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok("Welcome to Physics Game API!");
        }

        [HttpGet("about")]
        public IActionResult About()
        {
            return Ok(new { 
                Name = "Physics Game API",
                Version = "1.0.0",
                Description = "An educational physics game API"
            });
        }
    }
}