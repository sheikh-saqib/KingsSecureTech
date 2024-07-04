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
    public class FloorsService : IFloors
    {
        private readonly IRepository _repo;

        public FloorsService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Floors>> GetAllFloorsByAuditId(string auditId)
        {
            var floors = await _repo.GetByIdAsync<Floors>("auditId", auditId);
            return floors;
        }
    }
}
