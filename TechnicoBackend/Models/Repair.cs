using System;
using System.ComponentModel.DataAnnotations;

namespace TechnicoBackend.Models
{
    public class Repair
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Description { get; set; }

        public DateTime RepairDate { get; set; } = DateTime.UtcNow;

        public Guid PropertyId { get; set; }
        public Property? Property { get; set; }
    }
}
