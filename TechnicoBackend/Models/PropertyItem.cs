namespace TechnicoBackend.Models
{
    public class PropertyItem
    {
        public int Id { get; set; }
        public string? IdentificationNumber { get; set; }
        public string? Address { get; set; }
        public int YearOfConstruction { get; set; }
        public ICollection<PropertyOwnerPropertyItem>? PropertyOwnerPropertyItems { get; set; }
        public ICollection<Repair>? Repairs { get; set; }
    }
}
