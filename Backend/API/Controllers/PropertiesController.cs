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
