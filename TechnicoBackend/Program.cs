using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TechnicoBackend.Data;
using TechnicoBackend.Repositories;
using TechnicoBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Ρύθμιση της σύνδεσης με τη βάση δεδομένων
builder.Services.AddDbContext<TechnicoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Ρύθμιση των Repositories
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<PropertyRepository>();
builder.Services.AddScoped<RepairRepository>();

// Ρύθμιση των Services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PropertyService>();
builder.Services.AddScoped<RepairService>();

// Ρύθμιση CORS policy για το frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3002") // Διεύθυνση του frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Ρύθμιση JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Προσθήκη Controllers και Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ενεργοποίηση Swagger στο περιβάλλον ανάπτυξης
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Ρύθμιση Middleware
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
