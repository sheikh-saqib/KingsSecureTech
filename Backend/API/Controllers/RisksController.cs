using Core.Interfaces;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
            try
            {
                var risks = await _risksService.GetAllRisksAsync();
                return Ok(risks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetByAuditId/{auditId}")]
        public async Task<IActionResult> GetByAuditId(string auditId)
        {
            try
            {
                var risks = await _risksService.GetAllRisksByAuditId(auditId);
                return Ok(risks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Risks risk)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdFireDoor = await _risksService.CreateRiskAsync(risk);
                return Ok(createdFireDoor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var risk = await _risksService.GetById(id);
                if (risk == null)
                {
                    return NotFound();
                }
                return Ok(risk);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] Risks risk)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var updatedRisk = await _risksService.UpdateRiskAsync(risk);
                return Ok(updatedRisk);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var riskToDelete = await _risksService.GetById(id);
                if (riskToDelete == null)
                {
                    return NotFound();
                }

                await _risksService.DeleteRiskAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
