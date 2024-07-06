using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Services
{
    public class FireDoorsService : IFireDoors
    {
        private readonly IRepository _repo;

        public FireDoorsService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<FireDoors>> GetAllFireDoorsAsync()
        {
            var fireDoors = await _repo.GetAllAsync<FireDoors>();
            return fireDoors.ToList();
        }

        public async Task<IEnumerable<FireDoorDTO>> GetById(string id)
        {
            var fireDoors = await _repo.GetFireDoorByIdAsync<FireDoorDTO>("firedoorId", id);
            return fireDoors;
        }

        public async Task<IEnumerable<FireDoors>> GetAllFireDoorsByAuditId(string auditId)
        {
            var fireDoors = await _repo.GetFireDoorByAuditIdAsync<FireDoors>(auditId);
            return fireDoors;
        }

        public async Task<FireDoors> CreateFireDoorsAsync(FireDoors fireDoor)
        {
            await _repo.AddAsync(fireDoor);
            return fireDoor;
        }

        public async Task<FireDoors> UpdateFireDoorsAsync(FireDoors fireDoor)
        {
            var existingFireDoor = (await _repo.GetByIdAsync<FireDoors>("firedoorId",fireDoor.FireDoorId)).FirstOrDefault();
            if (existingFireDoor == null)
            {
                throw new KeyNotFoundException("Fire door not found.");
            }

            existingFireDoor.AreaId = fireDoor.AreaId;
            existingFireDoor.Barcode = fireDoor.Barcode;
            existingFireDoor.DoorMaterial = fireDoor.DoorMaterial;
            existingFireDoor.FrameMaterial = fireDoor.FrameMaterial;
            existingFireDoor.Result = fireDoor.Result;

            await _repo.UpdateAsync(existingFireDoor);
            return existingFireDoor;
        }

        //public async Task<bool> DeleteFireDoorsAsync(string fireDoorId)
        //{
        //    return await _repo.DeleteAsync<FireDoors>(fireDoorId);
        //}
    }
}
