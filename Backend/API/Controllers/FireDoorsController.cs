using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FireDoorsController : ControllerBase
    {
        private readonly IFireDoors _fireDoorService;

        public FireDoorsController(IFireDoors fireDoorService)
        {
            _fireDoorService = fireDoorService;
        }

        [HttpGet("GetByAreaId/{areaId}")]
        public async Task<IActionResult> GetByAreaId(string areaId)
        {
            var fireDoors = await _fireDoorService.GetAllFireDoorsByAreaId(areaId);
            return Ok(fireDoors);
        }
    }
}
