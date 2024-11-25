using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TechnicoBackend.Models;
using TechnicoBackend.Repositories;

namespace TechnicoBackend.Services
{
    public class PropertyService
    {
        private readonly PropertyRepository _propertyRepository;

        public PropertyService(PropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        public async Task<Property?> GetPropertyByIdAsync(Guid propertyId, Guid userId, string userType)
        {
            var property = await _propertyRepository.GetByIdAsync(propertyId);

            if (property == null || (userType != "Admin" && property.UserId != userId))
            {
                throw new UnauthorizedAccessException("Δεν έχετε δικαίωμα πρόσβασης σε αυτό το ακίνητο.");
            }

            return property;
        }

        public async Task<List<Property>> GetAllPropertiesAsync(Guid userId, string userType)
        {
            if (userType == "Admin")
            {
                return await _propertyRepository.GetAllAsync();
            }

            return await _propertyRepository.GetAllByUserIdAsync(userId);
        }

        public async Task AddPropertyAsync(Property property)
        {
            if (property == null)
            {
                throw new ArgumentNullException(nameof(property));
            }

            await _propertyRepository.AddAsync(property);
        }

        public async Task UpdatePropertyAsync(Property property, Guid userId, string userType)
        {
            if (property == null)
            {
                throw new ArgumentNullException(nameof(property));
            }

            if (userType != "Admin" && property.UserId != userId)
            {
                throw new UnauthorizedAccessException("Δεν μπορείτε να τροποποιήσετε αυτό το ακίνητο.");
            }

            await _propertyRepository.UpdateAsync(property);
        }

        public async Task DeletePropertyAsync(Guid propertyId, Guid userId, string userType)
        {
            var property = await _propertyRepository.GetByIdAsync(propertyId);

            if (property == null)
            {
                throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");
            }

            if (userType != "Admin" && property.UserId != userId)
            {
                throw new UnauthorizedAccessException("Δεν μπορείτε να διαγράψετε αυτό το ακίνητο.");
            }

            await _propertyRepository.DeleteAsync(propertyId);
        }
    }
}
