using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;
using MySqlX.XDevAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var audits = await _repo.GetAllAsync<Audits>();
            return audits.ToList();
        }

        public async Task<IEnumerable<Audits>> GetAllAuditsByCompanyId(string auditCompanyId)
        {
            var audits = await _repo.GetByIdAsync<Audits>("auditcompanyId", auditCompanyId);
            return audits;
        }

        public async Task<IEnumerable<Audits>> GetAllAuditsByPropertyId(string propertyId)
        {
            var audits = await _repo.GetByIdAsync<Audits>("propertyId", propertyId);
            return audits;
        }
    }
}
