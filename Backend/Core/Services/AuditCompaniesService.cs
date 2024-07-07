using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class AuditCompaniesService : IAuditCompanies
    {
        private readonly IRepository _repo;

        public AuditCompaniesService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<AuditCompanies>> GetAllAuditCompaniesAsync()
        {
            //Get all the audit companies
            var auditCompanies = await _repo.GetAllAsync<AuditCompanies>();
            return auditCompanies.ToList();
        }
    }
}
