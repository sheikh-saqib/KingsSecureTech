using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class DataService : IData
    {
        private readonly IRepository _repo;

        public DataService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<Data> GetByAuditId(string auditId)
        {
            var result = new Data();

            // Fetch floors for the given auditId
            var floors = await _repo.GetByIdAsync<Floors>("AuditId", auditId);

            // Map floors to Floor objects
            result.floors = floors.Select(f =>
            {
                var floor = new Floor
                {
                    FloorId = f.FloorId,
                    AuditId = f.AuditId,
                    Name = f.Name,
                    areas = new List<Area>()
                };
                return floor;
            }).ToList();

            // Fetch areas related to each floor
            foreach (var floor in result.floors)
            {
                var areas = await _repo.GetByIdAsync<Areas>("FloorId", floor.FloorId);

                // Map areas to Area objects and add to corresponding floor
                floor.areas = areas.Select(a =>
                {
                    var area = new Area
                    {
                        AreaId = a.AreaId,
                        FloorId = a.FloorId,
                        Name = a.Name,
                        fireDoor = new List<FireDoor>(),
                        risks = new List<Risk>()
                    };
                    return area;
                }).ToList();

                // Fetch fire doors related to each area
                foreach (var area in floor.areas)
                {
                    var fireDoors = await _repo.GetByIdAsync<FireDoors>("AreaId", area.AreaId);

                    // Map fire doors to FireDoors objects and add to respective area
                    area.fireDoor = fireDoors.Select(fd => new FireDoor
                    {
                        FireDoorId = fd.FireDoorId,
                        AreaId = fd.AreaId,
                        Barcode = fd.Barcode,
                        DoorMaterial = fd.DoorMaterial,
                        FrameMaterial = fd.FrameMaterial,
                        Result = fd.Result
                    }).ToList();

                    // Fetch risks related to each area
                    var risks = await _repo.GetByIdAsync<Risks>("AreaId", area.AreaId);

                    // Map risks to Risks objects and add to respective area
                    area.risks = risks.Select(r => new Risk
                    {
                        RiskId = r.RiskId,
                        AreaId = r.AreaId,
                        Observation = r.Observation,
                        Recommendation = r.Recommendation
                    }).ToList();
                }
            }

            return result;
        }
    }
}
