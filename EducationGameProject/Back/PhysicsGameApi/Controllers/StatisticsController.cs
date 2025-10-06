using Microsoft.AspNetCore.Mvc;
using PhysicsGame.BL.Services;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok(new { message = "Statistics API is running." });
        }

        [HttpGet("connections-by-date-range")]
        public async Task<IActionResult> GetConnectionsByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                if (startDate > endDate)
                {
                    return BadRequest("Start date cannot be greater than end date.");
                }

                var connections = await _statisticsService.GetConnectionsCountByDateRangeAsync(startDate, endDate);
                return Ok(connections);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("connections-by-country")]
        public async Task<IActionResult> GetConnectionsByCountry([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                if (startDate > endDate)
                {
                    return BadRequest("Start date cannot be greater than end date.");
                }

                var connectionsByCountry = await _statisticsService.GetConnectionsCountByCountryAsync(startDate, endDate);
                return Ok(connectionsByCountry);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}