using Microsoft.AspNetCore.Mvc;
using TechnicoBackend.Services;
using TechnicoBackend.Models;
using System.Security.Claims;

namespace TechnicoBackend.Controllers
{
    [ApiController] // Μόνο μία φορά εδώ
    [Route("api/[controller]")]
    public class RepairController : ControllerBase
    {
        private readonly RepairService _repairService;

        public RepairController(RepairService repairService)
        {
            _repairService = repairService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRepair(Guid id)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());
                var userType = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

                var repair = await _repairService.GetRepairByIdAsync(id, userId, userType);
                return Ok(repair);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddRepair(Repair repair)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());
                var userType = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

                await _repairService.AddRepairAsync(repair, userId, userType);
                return CreatedAtAction(nameof(GetRepair), new { id = repair.Id }, repair);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRepair(Guid id, Repair repair)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());
                var userType = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

                repair.Id = id;
                await _repairService.UpdateRepairAsync(repair, userId, userType);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            try
            {
                var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? Guid.Empty.ToString());
                var userType = User.FindFirst(ClaimTypes.Role)?.Value ?? "User";

                await _repairService.DeleteRepairAsync(id, userId, userType);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
