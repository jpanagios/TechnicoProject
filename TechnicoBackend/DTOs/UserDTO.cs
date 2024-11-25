using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.DTOs
{
    public class UserDTO
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [RegularExpression(@"^69\d{8}$", ErrorMessage = "Το τηλέφωνο πρέπει να είναι 10 ψηφία και να ξεκινάει με 69.")]
        public string? PhoneNumber { get; set; }

        [Required]
        public string? FullName { get; set; }

        [Required]
        public string? Password { get; set; } 
    }
}
