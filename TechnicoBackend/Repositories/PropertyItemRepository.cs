using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Data;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Repositories
{
    public class PropertyItemRepository : IPropertyItemRepository
    {
        private readonly TechnicoDbContext _context;
        private readonly ILogger<PropertyItemRepository> _logger;

        public PropertyItemRepository(TechnicoDbContext context, ILogger<PropertyItemRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<PropertyItem>> GetAllAsync()
        {
            _logger.LogInformation("Fetching all property items from the database.");
            return await _context.PropertyItems.ToListAsync();
        }

        public async Task<PropertyItem?> GetByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching property item with ID {id}.");
            return await _context.PropertyItems.FindAsync(id);
        }

        public async Task AddAsync(PropertyItem propertyItem)
        {
            _logger.LogInformation("Adding a new property item to the database.");
            _context.PropertyItems.Add(propertyItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(PropertyItem propertyItem)
        {
            _logger.LogInformation($"Updating property item with ID {propertyItem.Id}.");
            _context.PropertyItems.Update(propertyItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting property item with ID {id}.");
            var propertyItem = await GetByIdAsync(id);
            if (propertyItem != null)
            {
                _context.PropertyItems.Remove(propertyItem);
                await _context.SaveChangesAsync();
            }
            else
            {
                _logger.LogError($"Property item with ID {id} not found for deletion.");
            }
        }
    }
}
