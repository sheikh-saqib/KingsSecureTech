using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

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
            // Get all fire doors
            var fireDoors = await _repo.GetAllAsync<FireDoors>();
            return fireDoors.ToList();
        }

        public async Task<IEnumerable<FireDoorDTO>> GetById(string id)
        {
            // Get fire door by Id
            var fireDoors = await _repo.GetFireDoorByIdAsync<FireDoorDTO>("firedoorId", id);
            return fireDoors;
        }

        public async Task<IEnumerable<FireDoors>> GetAllFireDoorsByAuditId(string auditId)
        {
            // Get all fire doors by audit Id
            var fireDoors = await _repo.GetFireDoorByAuditIdAsync<FireDoors>(auditId);
            return fireDoors;
        }

        public async Task<FireDoors> CreateFireDoorsAsync(FireDoors fireDoor)
        {
            // Add fire door
            await _repo.AddAsync(fireDoor);
            return fireDoor;
        }

        public async Task<FireDoors> UpdateFireDoorsAsync(FireDoors fireDoor)
        {
            // Get the fire door to be updated
            var existingFireDoor = (await _repo.GetByIdAsync<FireDoors>("firedoorId",fireDoor.FireDoorId)).FirstOrDefault();
            if (existingFireDoor == null)
            {
                throw new KeyNotFoundException("Fire door not found.");
            }
            // map the updates
            existingFireDoor.AreaId = fireDoor.AreaId;
            existingFireDoor.Barcode = fireDoor.Barcode;
            existingFireDoor.DoorMaterial = fireDoor.DoorMaterial;
            existingFireDoor.FrameMaterial = fireDoor.FrameMaterial;
            existingFireDoor.Result = fireDoor.Result;

            // update fire door
            await _repo.UpdateAsync(existingFireDoor);
            return existingFireDoor;
        }

        public async Task<bool> DeleteFireDoorsAsync(string fireDoorId)
        {
            //delete fire door
            return await _repo.DeleteAsync<FireDoors>(fireDoorId);
        }
    }
}
