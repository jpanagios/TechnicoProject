using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Services;
using TechnicoBackend.Models;

namespace TechnicoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;

        public PropertyController(PropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst("sub")?.Value ?? throw new UnauthorizedAccessException());
                var userType = User.FindFirst("role")?.Value ?? throw new UnauthorizedAccessException();

                var property = await _propertyService.GetPropertyByIdAsync(id, userId, userType);
                return Ok(property);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateProperty(Property property)
        {
            try
            {
                await _propertyService.AddPropertyAsync(property);
                return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, property);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(Guid id, Property property)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst("sub")?.Value ?? throw new UnauthorizedAccessException());
                var userType = User.FindFirst("role")?.Value ?? throw new UnauthorizedAccessException();

                property.Id = id;
                await _propertyService.UpdatePropertyAsync(property, userId, userType);
                return NoContent();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(Guid id)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst("sub")?.Value ?? throw new UnauthorizedAccessException());
                var userType = User.FindFirst("role")?.Value ?? throw new UnauthorizedAccessException();

                await _propertyService.DeletePropertyAsync(id, userId, userType);
                return NoContent();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
