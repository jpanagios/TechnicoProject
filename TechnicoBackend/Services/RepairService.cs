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

    // Λήψη επισκευής βάσει ID
    public async Task<Repair?> GetRepairByIdAsync(Guid repairId)
    {
        var repair = await _repairRepository.GetByIdAsync(repairId);
        if (repair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }
        return repair;
    }

    // Λήψη όλων των επισκευών
    public async Task<List<Repair>> GetAllRepairsAsync()
    {
        return await _repairRepository.GetAllAsync();
    }

    // Προσθήκη νέας επισκευής
    public async Task AddRepairAsync(Repair repair)
    {
        // Έλεγχος αν υπάρχει το ακίνητο
        var property = await _propertyRepository.GetByIdAsync(repair.PropertyId);
        if (property == null)
        {
            throw new KeyNotFoundException("Το ακίνητο δεν βρέθηκε.");
        }

        // Αντιστοίχιση διεύθυνσης από το ακίνητο
        repair.RepairAddress = property.Address;

        // Προσθήκη επισκευής
        await _repairRepository.AddAsync(repair);
    }

    // Ενημέρωση επισκευής
    public async Task UpdateRepairAsync(Repair repair)
    {
        var existingRepair = await _repairRepository.GetByIdAsync(repair.Id);
        if (existingRepair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }

        // Ενημέρωση πεδίων
        existingRepair.Description = repair.Description;
        existingRepair.RepairDate = repair.RepairDate;
        existingRepair.Cost = repair.Cost;
        existingRepair.Type = repair.Type;
        existingRepair.Status = repair.Status;

        // Αποθήκευση αλλαγών
        await _repairRepository.UpdateAsync(existingRepair);
    }

    // Διαγραφή επισκευής
    public async Task DeleteRepairAsync(Guid repairId)
    {
        var repair = await _repairRepository.GetByIdAsync(repairId);
        if (repair == null)
        {
            throw new KeyNotFoundException("Η επισκευή δεν βρέθηκε.");
        }
        await _repairRepository.DeleteAsync(repairId);
    }
}
