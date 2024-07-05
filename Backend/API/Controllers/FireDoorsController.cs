using Core.Interfaces;
using Core.Services;
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _fireDoorService.GetAllFireDoorsAsync());
        }

        [HttpGet("GetByAreaId/{areaId}")]
        public async Task<IActionResult> GetByAreaId(string areaId)
        {
            var fireDoors = await _fireDoorService.GetAllFireDoorsByAreaId(areaId);
            return Ok(fireDoors);
        }
    }
}
