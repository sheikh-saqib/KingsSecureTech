using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("GetByFloorId/{floorId}")]
        public async Task<IActionResult> GetByFloorId(string floorId)
        {
            var areas = await _areasService.GetAllAreasByFloorId(floorId);
            return Ok(areas);
        }
    }
}
