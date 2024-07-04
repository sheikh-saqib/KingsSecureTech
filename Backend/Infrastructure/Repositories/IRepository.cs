using System.Collections.Generic;

namespace Infrastructure.Repositories
{
    public interface IRepository
    {
        Task<List<T>> GetAllAsync<T>() where T : class;
        Task<IEnumerable<T>> GetByIdAsync<T>(string propertyName, object propertyValue) where T : class;
    }
}
