using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var floors = await _repo.GetByIdAsync<Areas>("floorId", floorId);
            return floors;
        }
    }
}
