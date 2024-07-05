using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _auditsService.GetAllAuditsAsync());
        }

        [HttpGet("GetByCompanyId/{auditCompanyId}")]
        public async Task<IActionResult> GetByCompanyId(string auditCompanyId)
        {
            var audits = await _auditsService.GetAllAuditsByCompanyId(auditCompanyId);
            return Ok(audits);
        }

        [HttpGet("GetByPropertyId/{propertyId}")]
        public async Task<IActionResult> GetByPropertyId(string propertyId)
        {
            var audits = await _auditsService.GetAllAuditsByPropertyId(propertyId);
            return Ok(audits);
        }
    }
}
