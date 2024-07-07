using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IData _dataService;

        public DataController(IData dataService)
        {
            _dataService = dataService;
        }

        /// <summary>
        /// Gets data by the specified audit ID.
        /// </summary>
        /// <param name="auditId">The ID of the audit.</param>
        /// <returns>The data for the specified audit ID.</returns>
        [HttpGet("GetByAuditId/{auditId}")]
        public async Task<IActionResult> GetByAuditId(string auditId)
        {
            try
            {
                var data = await _dataService.GetByAuditId(auditId);
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }
    }
}
