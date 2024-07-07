using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

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
            // Get all the floors by audit Id
            var floors = await _repo.GetByIdAsync<Floors>("auditId", auditId);
            return floors;
        }
    }
}
