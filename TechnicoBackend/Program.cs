using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Data;
using TechnicoBackend.Repositories;
using TechnicoBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure Database
builder.Services.AddDbContext<TechnicoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Repositories
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<PropertyRepository>();
builder.Services.AddScoped<RepairRepository>();

// Configure Services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PropertyService>();
builder.Services.AddScoped<RepairService>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend origin
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configure Controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure Swagger for all environments (useful for testing)
app.UseSwagger();
app.UseSwaggerUI();

// Middleware setup
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
