using System;
using System.ComponentModel.DataAnnotations;

public class RepairDTO
{
    [Required]
    public string? Description { get; set; }

    [Required]
    public DateTime? RepairDate { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Το κόστος πρέπει να είναι θετικό.")]
    public decimal? Cost { get; set; }

    [Required]
    public Guid PropertyId { get; set; }
}
