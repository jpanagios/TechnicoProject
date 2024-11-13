using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyOwnerController : ControllerBase
    {
        private readonly IPropertyOwnerRepository _repository;
        private readonly ILogger<PropertyOwnerController> _logger;

        public PropertyOwnerController(IPropertyOwnerRepository repository, ILogger<PropertyOwnerController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all property owners.");
            var owners = await _repository.GetAllAsync();
            return Ok(owners);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation($"Fetching property owner with ID {id}.");
            var owner = await _repository.GetByIdAsync(id);
            if (owner == null)
            {
                _logger.LogError("Property owner not found.");
                return NotFound();
            }
            return Ok(owner);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PropertyOwner propertyOwner)
        {
            _logger.LogInformation("Creating a new property owner.");
            await _repository.AddAsync(propertyOwner);
            return CreatedAtAction(nameof(GetById), new { id = propertyOwner.Id }, propertyOwner);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PropertyOwner propertyOwner)
        {
            if (id != propertyOwner.Id)
            {
                _logger.LogError("Property owner ID mismatch.");
                return BadRequest();
            }

            _logger.LogInformation($"Updating property owner with ID {id}.");
            await _repository.UpdateAsync(propertyOwner);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation($"Deleting property owner with ID {id}.");
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
