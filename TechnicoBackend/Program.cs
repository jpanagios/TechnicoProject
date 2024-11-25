using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TechnicoBackend.Data;
using TechnicoBackend.Repositories;
using TechnicoBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// ������� ��� �������� �� �� ���� ���������
builder.Services.AddDbContext<TechnicoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ������� ��� Repositories
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<PropertyRepository>();
builder.Services.AddScoped<RepairRepository>();

// ������� ��� Services
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PropertyService>();
builder.Services.AddScoped<RepairService>();

// ������� CORS policy ��� �� frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3002") // ��������� ��� frontend
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ������� JWT Authentication
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

// �������� Controllers ��� Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ������������ Swagger ��� ���������� ���������
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ������� Middleware
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
