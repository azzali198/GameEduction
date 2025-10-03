using Microsoft.AspNetCore.Mvc;
using PhysicsGame.BL.Services;
using PhysicsGame.DAL.Entities;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionController : ControllerBase
    {
        private readonly IConnectionService _connectionService;

        public ConnectionController(IConnectionService connectionService)
        {
            _connectionService = connectionService;
        }

        [HttpPost("add-connection")]
        public async Task<IActionResult> AddConnection([FromBody] ConnectionInput input)
        {
            if (input == null || string.IsNullOrWhiteSpace(input.UserName))
                return BadRequest("UserName is required.");

            try
            {
                var connectionModel = new PhysicsGame.BL.Models.ConnectionModel
                {
                    Login = input.UserName,
                    Date = input.ConnectionDate,
                    ScorePhysics = input.PhysicsScore,
                    ScoreChemistry = input.ChemistryScore
                };
                await _connectionService.AddConnectionAsync(connectionModel);
                return Ok(new { message = "Connection saved successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ConnectionInput
    {
        public string UserName { get; set; }
        public DateTime ConnectionDate { get; set; }
        // Add other properties as needed

        public string PhysicsScore { get; set; }
        public string ChemistryScore { get; set; }
    }
}