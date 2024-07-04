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
    public class AuditCompaniesService : IAuditCompanies
    {
        private readonly IRepository _repo;

        public AuditCompaniesService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<AuditCompanies>> GetAllAuditCompaniesAsync()
        {
            var auditCompanies = await _repo.GetAllAsync<AuditCompanies>();
            return auditCompanies.ToList();
        }
    }
}
