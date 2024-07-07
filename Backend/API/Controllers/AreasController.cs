using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AreasController : ControllerBase
    {
        private readonly IAreas _areasService;

        public AreasController(IAreas areasService)
        {
            _areasService = areasService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var areas = await _areasService.GetAllAreasAsync();
                return Ok(areas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }

        [HttpGet("GetByFloorId/{floorId}")]
        public async Task<IActionResult> GetByFloorId(string floorId)
        {
            try
            {
                var areas = await _areasService.GetAllAreasByFloorId(floorId);
                return Ok(areas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request." });
            }
        }
    }
}
