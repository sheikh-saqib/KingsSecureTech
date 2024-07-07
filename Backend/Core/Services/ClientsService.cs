using Core.Interfaces;
using Core.Models;
using Infrastructure.Repositories;

namespace Core.Services
{
    public class ClientsService : IClients
    {
        private readonly IRepository _repo;
        public ClientsService(IRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<Clients>> GetAllClientsAsync()
        {
            //Get all clients
            var clients = await _repo.GetAllAsync<Clients>();
            return clients.ToList();
        }
    }
}
