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
    public class RisksService: IRisks
    {
        private readonly IRepository _repo;

        public RisksService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Risks>> GetAllRisksAsync()
        {
            var risks = await _repo.GetAllAsync<Risks>();
            return risks.ToList();
        }

        public async Task<IEnumerable<Risks>> GetAllRisksByAuditId(string auditId)
        {
            var risks = await _repo.GetRisksByAuditIdAsync<Risks>(auditId);
            return risks;
        }
    }
}
