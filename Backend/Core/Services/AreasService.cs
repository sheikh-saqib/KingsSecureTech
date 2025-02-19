﻿using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class AreasService : IAreas
    {
        private readonly IRepository _repo;

        public AreasService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Areas>> GetAllAreasByFloorId(string floorId)
        {
            //Get all areas for a floor Id
            var floors = await _repo.GetByIdAsync<Areas>("floorId", floorId);
            return floors;
        }
        public async Task<IEnumerable<Areas>> GetAllAreasAsync()
        {
            //Get all areas 
            var areas = await _repo.GetAllAsync<Areas>();
            return areas.ToList();
        }
    }
}
