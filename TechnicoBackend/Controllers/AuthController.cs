using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TechnicoBackend.Repositories;
using TechnicoBackend.Models;
using TechnicoBackend.DTOs;

namespace TechnicoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthController(UserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            // Έλεγχος αν υπάρχει ήδη ο χρήστης
            var users = await _userRepository.GetAllAsync();
            if (users.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Το email χρησιμοποιείται ήδη.");
            }

            // Δημιουργία νέου χρήστη
            var user = new User
            {
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                FullName = userDto.FullName,
                Password = userDto.Password, // Βεβαιώσου ότι κρυπτογραφείς τους κωδικούς
                UserType = "PropertyOwner" // Default τύπος χρήστη
            };

            await _userRepository.AddAsync(user);

            return Ok(new { Message = "Η εγγραφή ολοκληρώθηκε με επιτυχία." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            var users = await _userRepository.GetAllAsync();
            var user = users.FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

            if (user == null)
            {
                return Unauthorized("Λάθος email ή κωδικός πρόσβασης.");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("role", user.UserType),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}