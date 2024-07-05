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
    public class FireDoorsService : IFireDoors
    {
        private readonly IRepository _repo;
        public FireDoorsService(IRepository repo)
        {
            _repo = repo;
        }
        public async Task<IEnumerable<FireDoors>> GetAllFireDoorsAsync()
        {
            var fireDoors = await _repo.GetAllAsync<FireDoors>();
            return fireDoors.ToList();
        }
        public async Task<IEnumerable<FireDoors>> GetAllFireDoorsByAreaId(string areaId)
        {
            var fireDoors = await _repo.GetByIdAsync<FireDoors>("areaId", areaId);
            return fireDoors;
        }
    }
}
