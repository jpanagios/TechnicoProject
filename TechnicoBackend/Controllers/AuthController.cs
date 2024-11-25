using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Models;
using TechnicoBackend.Repositories;
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
            var existingUsers = await _userRepository.GetAllAsync();
            if (existingUsers.Any(u => u.Email == userDto.Email))
            {
                return BadRequest("Το email χρησιμοποιείται ήδη.");
            }

            var user = new User
            {
                Email = userDto.Email ?? throw new ArgumentNullException(nameof(userDto.Email)),
                PhoneNumber = userDto.PhoneNumber ?? throw new ArgumentNullException(nameof(userDto.PhoneNumber)),
                FullName = userDto.FullName ?? throw new ArgumentNullException(nameof(userDto.FullName)),
                Password = userDto.Password ?? throw new ArgumentNullException(nameof(userDto.Password))
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

            return Ok(new { Token = "dummy-token-for-now" });
        }
    }
}
