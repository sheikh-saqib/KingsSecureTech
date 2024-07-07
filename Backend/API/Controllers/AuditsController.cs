using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditsController : ControllerBase
    {
        private readonly IAudits _auditsService;

        public AuditsController(IAudits auditsService)
        {
            _auditsService = auditsService;
        }

        /// <summary>
        /// Gets a list of all audits.
        /// </summary>
        /// <returns>A list of audits.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var audits = await _auditsService.GetAllAuditsAsync();
                return Ok(audits);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }

        /// <summary>
        /// Gets a list of audits by the specified company ID.
        /// </summary>
        /// <param name="auditCompanyId">The ID of the audit company.</param>
        /// <returns>A list of audits for the specified company.</returns>
        [HttpGet("GetByCompanyId/{auditCompanyId}")]
        public async Task<IActionResult> GetByCompanyId(string auditCompanyId)
        {
            try
            {
                var audits = await _auditsService.GetAllAuditsByCompanyId(auditCompanyId);
                return Ok(audits);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }

        /// <summary>
        /// Gets a list of audits by the specified property ID.
        /// </summary>
        /// <param name="propertyId">The ID of the property.</param>
        /// <returns>A list of audits for the specified property.</returns>
        [HttpGet("GetByPropertyId/{propertyId}")]
        public async Task<IActionResult> GetByPropertyId(string propertyId)
        {
            try
            {
                var audits = await _auditsService.GetAllAuditsByPropertyId(propertyId);
                return Ok(audits);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }
    }
}
