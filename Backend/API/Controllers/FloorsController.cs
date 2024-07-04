using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorsController : ControllerBase
    {
        private readonly IFloors _floorsService;

        public FloorsController(IFloors floorsService)
        {
            _floorsService = floorsService;
        }

        [HttpGet("GetByAuditId/{auditId}")]
        public async Task<IActionResult> GetByAuditId(string auditId)
        {
            var floors = await _floorsService.GetAllFloorsByAuditId(auditId);
            return Ok(floors);
        }
    }
}
