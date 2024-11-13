namespace TechnicoBackend.Models
{
    public class Repair
    {
        public int Id { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string? TypeOfRepair { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public string Status { get; set; } = "Pending";
        public decimal Cost { get; set; }
        public int PropertyItemId { get; set; }
        public PropertyItem? PropertyItem { get; set; }
    }
}
