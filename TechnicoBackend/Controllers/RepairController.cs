using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepairController : ControllerBase
    {
        private readonly IRepairRepository _repository;
        private readonly ILogger<RepairController> _logger;

        public RepairController(IRepairRepository repository, ILogger<RepairController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all repairs.");
            var repairs = await _repository.GetAllAsync();
            return Ok(repairs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            _logger.LogInformation($"Fetching repair with ID {id}.");
            var repair = await _repository.GetByIdAsync(id);
            if (repair == null)
            {
                _logger.LogError("Repair not found.");
                return NotFound();
            }
            return Ok(repair);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Repair repair)
        {
            _logger.LogInformation("Creating a new repair.");
            await _repository.AddAsync(repair);
            return CreatedAtAction(nameof(GetById), new { id = repair.Id }, repair);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Repair repair)
        {
            if (id != repair.Id)
            {
                _logger.LogError("Repair ID mismatch.");
                return BadRequest();
            }

            _logger.LogInformation($"Updating repair with ID {id}.");
            await _repository.UpdateAsync(repair);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _logger.LogInformation($"Deleting repair with ID {id}.");
            await _repository.DeleteAsync(id);
            return NoContent();
        }
    }
}
