using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Services;
using TechnicoBackend.Models;
using TechnicoBackend.DTOs;

namespace TechnicoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        // GET: api/Property
        [HttpGet]
        public async Task<IActionResult> GetProperties()
        {
            try
            {
                var properties = await _propertyService.GetAllPropertiesAsync();
                return Ok(properties);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Property/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            try
            {
                var property = await _propertyService.GetPropertyByIdAsync(id);
                return Ok(property);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Property
        [HttpPost]
        public async Task<IActionResult> CreateProperty([FromBody] PropertyDTO propertyDto)
        {
            try
            {
                var createdProperty = await _propertyService.AddPropertyAsync(propertyDto);
                return CreatedAtAction(nameof(GetProperty), new { id = createdProperty.Id }, createdProperty);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Property/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(Guid id, [FromBody] PropertyDTO propertyDto)
        {
            try
            {
                await _propertyService.UpdatePropertyAsync(id, propertyDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Property/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            try
            {
                await _propertyService.DeletePropertyAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
