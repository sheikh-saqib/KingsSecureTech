using System.Data;
using System.Dynamic;
using Dapper;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;

namespace Infrastructure.Repositories
{
    public class Repository : IRepository
    {
        private readonly string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private IDbConnection CreateConnection()
        {
            return new MySqlConnection(_connectionString);
        }

        public async Task<List<T>> GetAllAsync<T>() where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                var query = $"SELECT * FROM {typeof(T).Name}";
                var entities = await db.QueryAsync<T>(query);
                return entities.ToList();
            }
        }

        public async Task<IEnumerable<T>> GetByIdAsync<T>(string propertyName, object propertyValue) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                var tableName = typeof(T).Name;
                var query = $"SELECT * FROM {tableName} WHERE {propertyName} = @{propertyName}";

                // Create DynamicParameters object
                var parameters = new DynamicParameters();
                parameters.Add(propertyName, propertyValue);

                var entities = await db.QueryAsync<T>(query, parameters);
                return entities;
            }
        }
    }
}
