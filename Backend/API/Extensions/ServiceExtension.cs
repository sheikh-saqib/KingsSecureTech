using Core.Interfaces;
using Core.Services;
using Infrastructure.Repositories;

namespace API.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services, string connectionString)
        {
            // Dependency Injection
            services.AddScoped<IRepository>(provider => new Repository(connectionString));
            services.AddTransient<IClients, ClientsService>();
            services.AddTransient<IProperties, PropertiesService>();
            services.AddTransient<IAuditCompanies, AuditCompaniesService>();
            services.AddTransient<IAudits, AuditsService>();
            services.AddTransient<IFloors, FloorsService>();
            services.AddTransient<IAreas, AreasService>();
            services.AddTransient<IFireDoors, FireDoorsService>();
            services.AddTransient<IRisks, RisksService>();
            services.AddTransient<IData, DataService>();

            return services;
        }
    }
}
