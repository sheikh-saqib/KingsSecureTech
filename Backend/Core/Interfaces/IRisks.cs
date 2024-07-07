using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IRisks
    {
        Task<IEnumerable<Risks>> GetAllRisksAsync();
        Task<IEnumerable<RisksDTO>> GetById(string id);
        Task<IEnumerable<Risks>> GetAllRisksByAuditId(string auditId);
        Task<Risks> CreateRiskAsync(Risks risk);
        Task<Risks> UpdateRiskAsync(Risks risk);
        Task<bool> DeleteRiskAsync(string riskId);
    }
}
