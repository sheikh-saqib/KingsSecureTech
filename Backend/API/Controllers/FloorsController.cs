using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

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

        /// <summary>
        /// Gets a list of floors by the specified audit ID.
        /// </summary>
        /// <param name="auditId">The ID of the audit.</param>
        /// <returns>A list of floors associated with the audit.</returns>
        [HttpGet("GetByAuditId/{auditId}")]
        public async Task<IActionResult> GetByAuditId(string auditId)
        {
            try
            {
                var floors = await _floorsService.GetAllFloorsByAuditId(auditId);
                return Ok(floors);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }
    }
}
