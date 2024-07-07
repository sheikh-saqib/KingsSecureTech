using Core.Interfaces;
using Core.Models;
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

        /// <summary>
        /// Gets a list of all fire doors.
        /// </summary>
        /// <returns>A list of fire doors.</returns>
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

        /// <summary>
        /// Gets a fire door by the specified ID.
        /// </summary>
        /// <param name="id">The ID of the fire door.</param>
        /// <returns>The fire door with the specified ID.</returns>
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

        /// <summary>
        /// Gets a list of fire doors by the specified audit ID.
        /// </summary>
        /// <param name="auditId">The ID of the audit.</param>
        /// <returns>A list of fire doors for the specified audit.</returns>
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

        /// <summary>
        /// Creates a new fire door.
        /// </summary>
        /// <param name="fireDoor">The fire door to create.</param>
        /// <returns>The created fire door.</returns>
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

        /// <summary>
        /// Updates an existing fire door.
        /// </summary>
        /// <param name="fireDoor">The fire door to update.</param>
        /// <returns>The updated fire door.</returns>
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

        /// <summary>
        /// Deletes a fire door by the specified ID.
        /// </summary>
        /// <param name="id">The ID of the fire door to delete.</param>
        /// <returns>An action result.</returns>
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
