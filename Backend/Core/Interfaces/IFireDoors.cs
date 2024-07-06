using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IFireDoors
    {
        Task<IEnumerable<FireDoorDTO>> GetById(string id);
        Task<IEnumerable<FireDoors>> GetAllFireDoorsByAuditId(string auditId);
        Task<IEnumerable<FireDoors>> GetAllFireDoorsAsync();
        Task<FireDoors> CreateFireDoorsAsync(FireDoors fireDoor);
        Task<FireDoors> UpdateFireDoorsAsync(FireDoors fireDoor);
        //Task<FireDoors> DeleteFireDoorsAsync(FireDoors fireDoor);
    }
}
