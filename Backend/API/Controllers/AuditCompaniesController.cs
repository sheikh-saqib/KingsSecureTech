using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditCompaniesController : ControllerBase
    {
        private readonly IAuditCompanies _auditCompaniesService;

        public AuditCompaniesController(IAuditCompanies auditCompaniesService)
        {
            _auditCompaniesService = auditCompaniesService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var auditCompanies = await _auditCompaniesService.GetAllAuditCompaniesAsync();
                return Ok(auditCompanies);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }
    }
}
