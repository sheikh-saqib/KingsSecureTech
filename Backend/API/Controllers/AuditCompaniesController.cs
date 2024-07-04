using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
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
            return Ok(await _auditCompaniesService.GetAllAuditCompaniesAsync());
        }
    }
}
