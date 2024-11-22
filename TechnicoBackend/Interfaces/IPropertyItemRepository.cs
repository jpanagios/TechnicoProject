using TechnicoBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TechnicoBackend.Interfaces
{
    public interface IPropertyItemRepository
    {
        Task<IEnumerable<PropertyItem>> GetAllAsync();
        Task<PropertyItem?> GetByIdAsync(int id);
        Task AddAsync(PropertyItem propertyItem);
        Task UpdateAsync(PropertyItem propertyItem);
        Task DeleteAsync(int id);
    }
}
