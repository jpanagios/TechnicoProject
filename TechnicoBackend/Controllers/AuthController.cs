using Microsoft.AspNetCore.Mvc;
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

        public AuthController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            var users = await _userRepository.GetAllAsync();
            if (users.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Το email χρησιμοποιείται ήδη.");
            }

            var user = new User
            {
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                FirstName = userDto.FirstName ?? string.Empty,
                LastName = userDto.LastName ?? string.Empty,
                Password = userDto.Password ?? string.Empty,
                UserType = "PropertyOwner"
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

            return Ok(new { Message = "Σύνδεση επιτυχής" });
        }
    }
}
