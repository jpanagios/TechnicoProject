using TechnicoBackend.Models;

namespace TechnicoBackend.Interfaces
{
    public interface IRepairRepository
    {
        Task<IEnumerable<Repair>> GetAllAsync();
        Task<Repair?> GetByIdAsync(int id);
        Task AddAsync(Repair repair);
        Task UpdateAsync(Repair repair);
        Task DeleteAsync(int id);
    }
}
