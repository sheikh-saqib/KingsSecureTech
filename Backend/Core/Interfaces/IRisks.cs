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
        Task<IEnumerable<Risks>> GetAllRisksByAuditId(string auditId);
    }
}
