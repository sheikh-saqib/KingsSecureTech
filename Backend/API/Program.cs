using Core.Interfaces;
using Core.Services;
using Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddTransient<IRepository, Repository>(provider =>
    new Repository(connectionString));

builder.Services.AddTransient<IClients, ClientsService>();
builder.Services.AddTransient<IProperties, PropertiesService>();
builder.Services.AddTransient<IAuditCompanies, AuditCompaniesService>();
builder.Services.AddTransient<IAudits, AuditsService>();
builder.Services.AddTransient<IFloors, FloorsService>();
builder.Services.AddTransient<IAreas, AreasService>();
builder.Services.AddTransient<IFireDoors, FireDoorsService>();
builder.Services.AddTransient<IRisks, RisksService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Kings Secure Tech API V1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
