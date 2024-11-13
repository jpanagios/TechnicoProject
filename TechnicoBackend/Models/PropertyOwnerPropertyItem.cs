namespace TechnicoBackend.Models
{
    public class PropertyOwnerPropertyItem
    {
        public int PropertyOwnerId { get; set; }
        public PropertyOwner? PropertyOwner { get; set; }

        public int PropertyItemId { get; set; }
        public PropertyItem? PropertyItem { get; set; }
    }
}
