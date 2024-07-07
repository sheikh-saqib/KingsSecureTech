using Core.Interfaces;
using Core.Models;
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

        /// <summary>
        /// Gets a list of all risks.
        /// </summary>
        /// <returns>A list of risks.</returns>
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

        /// <summary>
        /// Gets a list of risks by the specified audit ID.
        /// </summary>
        /// <param name="auditId">The ID of the audit.</param>
        /// <returns>A list of risks associated with the audit.</returns>
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

        /// <summary>
        /// Creates a new risk.
        /// </summary>
        /// <param name="risk">The risk object to create.</param>
        /// <returns>The created risk.</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Risks risk)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdRisk = await _risksService.CreateRiskAsync(risk);
                return Ok(createdRisk);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets a risk by the specified ID.
        /// </summary>
        /// <param name="id">The ID of the risk.</param>
        /// <returns>The risk with the specified ID.</returns>
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

        /// <summary>
        /// Updates an existing risk.
        /// </summary>
        /// <param name="risk">The risk object to update.</param>
        /// <returns>The updated risk.</returns>
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

        /// <summary>
        /// Deletes a risk by the specified ID.
        /// </summary>
        /// <param name="id">The ID of the risk to delete.</param>
        /// <returns>An action result.</returns>
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
