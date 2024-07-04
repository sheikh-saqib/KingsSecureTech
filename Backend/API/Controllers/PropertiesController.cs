using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI;

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
            var properties = await _propertiesService.GetAllPropertiesAsync();
            return Ok(properties);
        }

        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetById(string clientId)
        {
            var properties = await _propertiesService.GetAllPropertiesById(clientId);
            return Ok(properties);
        }
    }
}
