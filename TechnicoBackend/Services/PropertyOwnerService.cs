using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Data;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Services
{
    public class PropertyOwnerService : IPropertyOwnerRepository
    {
        private readonly TechnicoDbContext _context;
        private readonly ILogger<PropertyOwnerService> _logger;

        public PropertyOwnerService(TechnicoDbContext context, ILogger<PropertyOwnerService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<PropertyOwner>> GetAllAsync()
        {
            _logger.LogInformation("Fetching all property owners.");
            return await _context.PropertyOwners.ToListAsync();
        }

        public async Task<PropertyOwner?> GetByIdAsync(int id)
        {
            _logger.LogInformation($"Fetching property owner with ID {id}.");
            return await _context.PropertyOwners.FindAsync(id);
        }

        public async Task AddAsync(PropertyOwner propertyOwner)
        {
            _logger.LogInformation("Adding a new property owner to the database.");
            _context.PropertyOwners.Add(propertyOwner);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(PropertyOwner propertyOwner)
        {
            _logger.LogInformation($"Updating property owner with ID {propertyOwner.Id}.");
            _context.PropertyOwners.Update(propertyOwner);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            _logger.LogInformation($"Deleting property owner with ID {id}.");
            var propertyOwner = await GetByIdAsync(id);
            if (propertyOwner != null)
            {
                _context.PropertyOwners.Remove(propertyOwner);
                await _context.SaveChangesAsync();
            }
            else
            {
                _logger.LogError($"Property owner with ID {id} not found for deletion.");
            }
        }
    }
}
