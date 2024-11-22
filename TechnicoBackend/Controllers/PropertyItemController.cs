using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyItemController : ControllerBase
    {
        private readonly IPropertyItemRepository _repository;
        private readonly ILogger<PropertyItemController> _logger;

        public PropertyItemController(IPropertyItemRepository repository, ILogger<PropertyItemController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all property items.");
            var items = await _repository.GetAllAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation($"Fetching property item with ID {id}.");
            var item = await _repository.GetByIdAsync(id);
            if (item == null)
            {
                _logger.LogError("Property item not found.");
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PropertyItem propertyItem)
        {
            _logger.LogInformation("Creating a new property item.");
            await _repository.AddAsync(propertyItem);
            return CreatedAtAction(nameof(GetById), new { id = propertyItem.Id }, propertyItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PropertyItem propertyItem)
        {
            if (id != propertyItem.Id)
            {
                _logger.LogError("Property item ID mismatch.");
                return BadRequest();
            }

            _logger.LogInformation($"Updating property item with ID {id}.");
            await _repository.UpdateAsync(propertyItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation($"Deleting property item with ID {id}.");
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
