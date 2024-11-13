using TechnicoBackend.Models;

namespace TechnicoBackend.Interfaces
{
    public interface IPropertyOwnerRepository
    {
        Task<IEnumerable<PropertyOwner>> GetAllAsync();
        Task<PropertyOwner?> GetByIdAsync(int id);
        Task AddAsync(PropertyOwner propertyOwner);
        Task UpdateAsync(PropertyOwner propertyOwner);
        Task DeleteAsync(int id);
    }
}
