using System.Data;
using System.Reflection;
using Dapper;
using MySql.Data.MySqlClient;

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
        public async Task<int> AddAsync<T>(T entity) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                var tableName = typeof(T).Name;

                var properties = GetNonNullProperties(entity);

                var columns = string.Join(", ", properties.Select(p => p.Name));
                var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));
                var query = $"INSERT INTO {tableName} ({columns}) VALUES ({values})";

                var affectedRows = await db.ExecuteAsync(query, entity);
                return affectedRows;
            }
        }

        private IEnumerable<PropertyInfo> GetNonNullProperties<T>(T entity) where T : class
        {
            return entity.GetType().GetProperties()
                .Where(p => p.GetValue(entity) != null);
        }

        public async Task<IEnumerable<T>> GetFireDoorByAuditIdAsync<T>(string auditId) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                string query = @"
            SELECT fd.*,au.*
            FROM firedoors fd
            JOIN areas a ON fd.areaId = a.areaId
            JOIN floors f ON a.floorId = f.floorId
            JOIN audits au ON f.auditId = au.auditId
            WHERE au.auditId = @AuditId;
        ";

                var parameters = new { AuditId = auditId };

                return await db.QueryAsync<T>(query, parameters);
            }
        }
        public async Task<IEnumerable<T>> GetRisksByAuditIdAsync<T>(string auditId) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                string query = @"
                    SELECT r.*, au.*
                    FROM risks r
                    JOIN areas a ON r.areaId = a.areaId
                    JOIN floors f ON a.floorId = f.floorId
                    JOIN audits au ON f.auditId = au.auditId
                    WHERE au.auditId = @AuditId;
                ";

                var parameters = new { AuditId = auditId };

                return await db.QueryAsync<T>(query, parameters);
            }
        }

        public async Task<IEnumerable<T>> GetFireDoorByIdAsync<T>(string propertyName, object propertyValue) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                string query = @"
                SELECT fd.FireDoorId, fd.AreaId, fd.Barcode, fd.DoorMaterial, fd.FrameMaterial, 
                       fd.Result, f.FloorId, au.AuditId, p.PropertyId, c.ClientId
                FROM firedoors fd
                JOIN areas a ON fd.AreaId = a.AreaId
                JOIN floors f ON a.FloorId = f.FloorId
                JOIN audits au ON f.AuditId = au.AuditId
                JOIN properties p ON au.PropertyId = p.PropertyId
                JOIN clients c ON p.ClientId = c.ClientId
                WHERE fd.FireDoorId = @FireDoorId;
            ";

                var parameters = new DynamicParameters();
                parameters.Add(propertyName, propertyValue);

                var entities = await db.QueryAsync<T>(query, parameters);
                return entities;
            }
        }

        public async Task<int> UpdateAsync<T>(T entity) where T : class
        {
            using (IDbConnection db = CreateConnection())
            {
                var tableName = typeof(T).Name;
                var properties = GetNonNullProperties(entity);

                var setClause = string.Join(", ", properties.Select(p => $"{p.Name} = @{p.Name}"));
                var keyProperty = properties.First(p => p.Name.ToLower().Contains("id"));
                var query = $"UPDATE {tableName} SET {setClause} WHERE {keyProperty.Name} = @{keyProperty.Name}";

                var affectedRows = await db.ExecuteAsync(query, entity);
                return affectedRows;
            }
        }

    }
}
