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
            try
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
                    VatNumber = userDto.VatNumber ?? string.Empty,
                    UserType = "PropertyOwner"
                };

                await _userRepository.AddAsync(user);

                // Επιστροφή του ID και μηνύματος επιτυχίας
                return Ok(new
                {
                    Id = user.Id,
                    Message = "Η εγγραφή ολοκληρώθηκε με επιτυχία."
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Σφάλμα κατά την εγγραφή: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                var user = users.FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

                if (user == null)
                {
                    return Unauthorized("Λάθος email ή κωδικός πρόσβασης.");
                }

                return Ok(new
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Message = "Σύνδεση επιτυχής"
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Σφάλμα κατά τη σύνδεση: {ex.Message}");
            }
        }
    }
}
