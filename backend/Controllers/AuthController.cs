using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using J3Dental.Api.Database;
using J3Dental.Api.Models;
using BCrypt.Net;
using System.Threading.Tasks;

namespace J3Dental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly J3DbContext _context;

        public AuthController(J3DbContext context)
        {
            _context = context;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if email already registered
            var existing = await _context.Clinics.AnyAsync(c => c.Email.ToLower() == dto.Email.ToLower());
            if (existing)
                return BadRequest(new { message = "Email is already registered." });

            // Create new Clinic Entity
            var clinic = new Clinic
            {
                ClinicName = dto.ClinicName,
                DoctorName = dto.DoctorName,
                Phone = dto.Phone,
                GstNumber = dto.GstNumber,
                Email = dto.Email,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Clinics.Add(clinic);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Clinic registered successfully.", clinicId = clinic.Id });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var clinic = await _context.Clinics.FirstOrDefaultAsync(c => c.Email.ToLower() == dto.Email.ToLower());
            if (clinic == null || !BCrypt.Net.BCrypt.Verify(dto.Password, clinic.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }

            return Ok(new
            {
                message = "Login successful.",
                clinic = new
                {
                    clinic.Id,
                    clinic.ClinicName,
                    clinic.DoctorName,
                    clinic.Email,
                    clinic.Phone,
                    clinic.Address,
                    clinic.City,
                    clinic.State,
                    clinic.Pincode
                }
            });
        }
    }

    public class RegisterDto
    {
        public string ClinicName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? GstNumber { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
