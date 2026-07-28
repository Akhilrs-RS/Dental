using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using J3Dental.Api.Database;
using J3Dental.Api.Models;
using System.Threading.Tasks;
using System.Linq;

namespace J3Dental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly J3DbContext _context;

        public AdminController(J3DbContext context)
        {
            _context = context;
        }

        // POST: api/admin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminLoginDto dto)
        {
            if (dto.Email.ToLower() == "admin@j3dental.com" && dto.Password == "admin_secure_123")
            {
                return Ok(new { message = "Admin login successful.", email = dto.Email });
            }
            return Unauthorized(new { message = "Invalid admin credentials." });
        }

        // POST: api/admin/forgot-password
        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword([FromBody] AdminForgotPasswordDto dto)
        {
            if (dto.Email.ToLower() == "admin@j3dental.com")
            {
                return Ok(new { message = "Password reset recovery email has been sent." });
            }
            return BadRequest(new { message = "Admin email not found." });
        }

        // GET: api/admin/clinics
        [HttpGet("clinics")]
        public async Task<IActionResult> GetClinics()
        {
            var clinics = await _context.Clinics
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new
                {
                    c.Id,
                    c.ClinicName,
                    c.DoctorName,
                    c.Phone,
                    c.GstNumber,
                    c.Email,
                    c.Address,
                    c.City,
                    c.State,
                    c.Pincode,
                    c.CreatedAt
                })
                .ToListAsync();

            return Ok(clinics);
        }

        // PUT: api/admin/pickups/{id}/status
        [HttpPut("pickups/{id}/status")]
        public async Task<IActionResult> UpdatePickupStatus(int id, [FromBody] UpdateStatusDto dto)
        {
            var pickup = await _context.PickupRequests.FindAsync(id);
            if (pickup == null)
            {
                return NotFound(new { message = "Pickup request not found." });
            }

            pickup.Status = dto.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated successfully.", pickupId = pickup.Id, status = pickup.Status });
        }
    }

    public class AdminLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AdminForgotPasswordDto
    {
        public string Email { get; set; } = string.Empty;
    }

    public class UpdateStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}
