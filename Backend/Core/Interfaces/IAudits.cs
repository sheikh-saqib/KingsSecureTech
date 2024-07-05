using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IAudits
    {
        Task<IEnumerable<Audits>> GetAllAuditsByCompanyId(string auditCompanyId);
        Task<IEnumerable<Audits>> GetAllAuditsByPropertyId(string propertyId);
        Task<IEnumerable<Audits>> GetAllAuditsAsync();
    }
}
