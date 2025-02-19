﻿using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IClients _clientService;
        public ClientsController(IClients clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Gets a list of all clients.
        /// </summary>
        /// <returns>A list of clients.</returns>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var clients = await _clientService.GetAllClientsAsync();
                return Ok(clients);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", ex.Message });
            }
        }
    }
}
