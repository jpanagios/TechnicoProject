using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Data;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TechnicoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPropertyOwnerRepository, PropertyOwnerRepository>();
builder.Services.AddScoped<IPropertyItemRepository, PropertyItemRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TechnicoBackend v1"));
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

