using Core.Interfaces;
using Core.Models;
using Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FireDoorsController : ControllerBase
    {
        private readonly IFireDoors _fireDoorService;

        public FireDoorsController(IFireDoors fireDoorService)
        {
            _fireDoorService = fireDoorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var fireDoors = await _fireDoorService.GetAllFireDoorsAsync();
                return Ok(fireDoors);
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
                var fireDoor = await _fireDoorService.GetById(id);
                if (fireDoor == null)
                {
                    return NotFound();
                }
                return Ok(fireDoor);
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
                var fireDoors = await _fireDoorService.GetAllFireDoorsByAuditId(auditId);
                return Ok(fireDoors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] FireDoors fireDoor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdFireDoor = await _fireDoorService.CreateFireDoorsAsync(fireDoor);
                return Ok(createdFireDoor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] FireDoors fireDoor)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var updatedFireDoor = await _fireDoorService.UpdateFireDoorsAsync(fireDoor);
                return Ok(updatedFireDoor);
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
                var fireDoorToDelete = await _fireDoorService.GetById(id);
                if (fireDoorToDelete == null)
                {
                    return NotFound();
                }

                await _fireDoorService.DeleteFireDoorsAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
