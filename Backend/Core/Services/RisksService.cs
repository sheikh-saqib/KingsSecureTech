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
    public class RisksService : IRisks
    {
        private readonly IRepository _repo;

        public RisksService(IRepository repo)
        {
            _repo = repo;
        }
        public async Task<IEnumerable<Risks>> GetAllRisksAsync()
        {
            // Get all risks
            var risks = await _repo.GetAllAsync<Risks>();
            return risks.ToList();
        }

        public async Task<IEnumerable<Risks>> GetAllRisksByAuditId(string auditId)
        {
            // Get risks by audit Id
            var risks = await _repo.GetRisksByAuditIdAsync<Risks>(auditId);
            return risks;
        }

        public async Task<Risks> CreateRiskAsync(Risks risk)
        {
            // Add new Risk
            await _repo.AddAsync(risk);
            return risk;
        }

        public async Task<IEnumerable<RisksDTO>> GetById(string id)
        {
            // Get Risk by Id
            var risk = await _repo.GetRiskByIdAsync<RisksDTO>("riskId", id);
            return risk;
        }

        public async Task<Risks> UpdateRiskAsync(Risks risk)
        {
            // Get existing Risk to be updated
            var existingRisk = (await _repo.GetByIdAsync<Risks>("riskId", risk.RiskId)).FirstOrDefault();
            if (existingRisk == null)
            {
                throw new KeyNotFoundException("Risk not found.");
            }
            // Apply the updates
            existingRisk.AreaId = risk.AreaId;
            existingRisk.Observation = risk.Observation;
            existingRisk.Recommendation = risk.Recommendation;
            existingRisk.Priority = risk.Priority;

            // Update Risk
            await _repo.UpdateAsync(existingRisk);
            return existingRisk;
        }

        public async Task<bool> DeleteRiskAsync(string riskId)
        {
            // Delete Risk
            return await _repo.DeleteAsync<Risks>(riskId);
        }
    }
}
