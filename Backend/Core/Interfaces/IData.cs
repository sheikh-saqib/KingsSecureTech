using Core.Models;
using Mysqlx.Crud;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IData
    {
        Task<Data> GetByAuditId(string auditId);
    }
}
