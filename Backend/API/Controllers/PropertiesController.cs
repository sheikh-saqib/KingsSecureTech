using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IProperties _propertiesService;

        public PropertiesController(IProperties propertiesService)
        {
            _propertiesService = propertiesService;
        }

        /// <summary>
        /// Gets a list of all properties.
        /// </summary>
        /// <returns>A list of properties.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var properties = await _propertiesService.GetAllPropertiesAsync();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets a list of properties by the specified client ID.
        /// </summary>
        /// <param name="clientId">The ID of the client.</param>
        /// <returns>A list of properties belonging to the specified client.</returns>
        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetById(string clientId)
        {
            try
            {
                var properties = await _propertiesService.GetAllPropertiesById(clientId);
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
