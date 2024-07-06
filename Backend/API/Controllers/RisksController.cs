using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RisksController : ControllerBase
    {
        private readonly IRisks _risksService;

        public RisksController(IRisks risksService)
        {
            _risksService = risksService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _risksService.GetAllRisksAsync());
        }

        [HttpGet("GetByAuditId/{auditId}")]
        public async Task<IActionResult> GetByAuditId(string auditId)
        {
            var risks = await _risksService.GetAllRisksByAuditId(auditId);
            return Ok(risks);
        }
    }
}
