﻿using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class PropertiesService : IProperties
    {
        private readonly IRepository _repo;
        public PropertiesService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Properties>> GetAllPropertiesAsync()
        {
            // Get all properties 
            return await _repo.GetAllAsync<Properties>();
        }

        public async Task<IEnumerable<Properties>> GetAllPropertiesById(string clientId)
        {
            // Get properties by client Id
            return await _repo.GetByIdAsync<Properties>("clientId", clientId);
        }
    }
}
