using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class AuditsService : IAudits
    {
        private readonly IRepository _repo;

        public AuditsService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Audits>> GetAllAuditsAsync()
        {
            //Get all Audits
            var audits = await _repo.GetAllAsync<Audits>();
            return audits.ToList();
        }

        public async Task<IEnumerable<Audits>> GetAllAuditsByCompanyId(string auditCompanyId)
        {
            //Get audits from company Id
            var audits = await _repo.GetByIdAsync<Audits>("auditcompanyId", auditCompanyId);
            return audits;
        }

        public async Task<IEnumerable<Audits>> GetAllAuditsByPropertyId(string propertyId)
        {
            //Get audits from property Id
            var audits = await _repo.GetByIdAsync<Audits>("propertyId", propertyId);
            return audits;
        }
    }
}
