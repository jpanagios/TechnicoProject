using System;
using System.ComponentModel.DataAnnotations;

public class RepairDTO
{
    [Required]
    [MaxLength(200, ErrorMessage = "Η περιγραφή δεν μπορεί να υπερβαίνει τις 200 λέξεις.")]
    public string? Description { get; set; }

    [Required]
    public DateTime? RepairDate { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Το κόστος πρέπει να είναι θετικό.")]
    public decimal? Cost { get; set; }

    [Required]
    public string? Type { get; set; } // Επιλογές: Painting, Insulation, etc.

    public string? Status { get; set; } // Read-only στο Controller, αλλαγή μόνο από Admin

    [Required]
    public Guid PropertyId { get; set; }
}
