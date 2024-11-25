using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TechnicoBackend.Models;
using TechnicoBackend.Repositories;

public class RepairService
{
    private readonly RepairRepository _repairRepository;
    private readonly PropertyRepository _propertyRepository;

    public RepairService(RepairRepository repairRepository, PropertyRepository propertyRepository)
    {
        _repairRepository = repairRepository;
        _propertyRepository = propertyRepository;
    }

    public async Task<Repair?> GetRepairByIdAsync(Guid repairId, Guid userId, string userType)
    {
        var repair = await _repairRepository.GetByIdAsync(repairId);

        if (repair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }

        var property = await _propertyRepository.GetByIdAsync(repair.PropertyId);

        if (property == null || (userType != "Admin" && property.UserId != userId))
        {
            throw new UnauthorizedAccessException("Δεν έχετε δικαίωμα πρόσβασης σε αυτή την επισκευή.");
        }

        return repair;
    }

    public async Task<List<Repair>> GetAllRepairsAsync(Guid userId, string userType)
    {
        if (userType == "Admin")
        {
            return await _repairRepository.GetAllAsync();
        }

        return await _repairRepository.GetAllByUserIdAsync(userId);
    }

    public async Task AddRepairAsync(Repair repair, Guid userId, string userType)
    {
        var property = await _propertyRepository.GetByIdAsync(repair.PropertyId);

        if (property == null || (userType != "Admin" && property.UserId != userId))
        {
            throw new UnauthorizedAccessException("Δεν μπορείτε να προσθέσετε επισκευή σε αυτό το ακίνητο.");
        }

        await _repairRepository.AddAsync(repair);
    }

    public async Task UpdateRepairAsync(Repair repair, Guid userId, string userType)
    {
        var existingRepair = await _repairRepository.GetByIdAsync(repair.Id);

        if (existingRepair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }

        var property = await _propertyRepository.GetByIdAsync(existingRepair.PropertyId);

        if (property == null || (userType != "Admin" && property.UserId != userId))
        {
            throw new UnauthorizedAccessException("Δεν μπορείτε να τροποποιήσετε αυτή την επισκευή.");
        }

        await _repairRepository.UpdateAsync(repair);
    }

    public async Task DeleteRepairAsync(Guid repairId, Guid userId, string userType)
    {
        var repair = await _repairRepository.GetByIdAsync(repairId);

        if (repair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }

        var property = await _propertyRepository.GetByIdAsync(repair.PropertyId);

        if (property == null || (userType != "Admin" && property.UserId != userId))
        {
            throw new UnauthorizedAccessException("Δεν μπορείτε να διαγράψετε αυτή την επισκευή.");
        }

        await _repairRepository.DeleteAsync(repairId);
    }
}
