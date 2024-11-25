using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string FullName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string PhoneNumber { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        public string UserType { get; set; } = "PropertyOwner"; 

        public ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
