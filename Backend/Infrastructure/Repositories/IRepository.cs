using System.Collections.Generic;

namespace Infrastructure.Repositories
{
    public interface IRepository
    {
        Task<List<T>> GetAllAsync<T>() where T : class;
        Task<IEnumerable<T>> GetByIdAsync<T>(string propertyName, object propertyValue) where T : class;
        Task<IEnumerable<T>> GetFireDoorByIdAsync<T>(string propertyName, object propertyValue) where T : class;
        Task<IEnumerable<T>> GetRiskByIdAsync<T>(string propertyName, object propertyValue) where T : class;
        Task<IEnumerable<T>> GetFireDoorByAuditIdAsync<T>(string auditId) where T : class;
        Task<IEnumerable<T>> GetRisksByAuditIdAsync<T>(string auditId) where T : class;
        Task<int> AddAsync<T>(T entity) where T : class;
        Task<int> UpdateAsync<T>(T entity) where T : class;
        Task<bool> DeleteAsync<T>(string id) where T : class;
    }
}
