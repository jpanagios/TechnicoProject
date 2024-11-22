using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Data;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Repositories
{
    public class RepairRepository : IRepairRepository
    {
        private readonly TechnicoDbContext _context;
        private readonly ILogger<RepairRepository> _logger;

        public RepairRepository(TechnicoDbContext context, ILogger<RepairRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Repair>> GetAllAsync()
        {
            _logger.LogInformation("Fetching all repairs from the database.");
            return await _context.Repairs.ToListAsync();
        }

        public async Task<Repair?> GetByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching repair with ID {id}.");
            return await _context.Repairs.FindAsync(id);
        }

        public async Task AddAsync(Repair repair)
        {
            _logger.LogInformation("Adding a new repair to the database.");
            _context.Repairs.Add(repair);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Repair repair)
        {
            _logger.LogInformation($"Updating repair with ID {repair.Id}.");
            _context.Repairs.Update(repair);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting repair with ID {id}.");
            var repair = await GetByIdAsync(id);
            if (repair != null)
            {
                _context.Repairs.Remove(repair);
                await _context.SaveChangesAsync();
            }
            else
            {
                _logger.LogError($"Repair with ID {id} not found for deletion.");
            }
        }
    }
}
