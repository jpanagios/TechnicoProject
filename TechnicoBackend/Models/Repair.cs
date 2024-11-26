using System;
using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.Models
{
    public class Repair
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Description { get; set; }

        [Required]
        public DateTime RepairDate { get; set; }

        // Σχέση με Property
        public Guid PropertyId { get; set; }
        public Property? Property { get; set; }
    }
}
