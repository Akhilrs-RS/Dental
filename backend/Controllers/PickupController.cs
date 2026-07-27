using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using J3Dental.Api.Database;
using J3Dental.Api.Models;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace J3Dental.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PickupController : ControllerBase
    {
        private readonly J3DbContext _context;

        public PickupController(J3DbContext context)
        {
            _context = context;
        }

        // GET: api/pickup
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var pickups = await _context.PickupRequests
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            return Ok(pickups);
        }

        // GET: api/pickup/clinic/{clinicId}
        [HttpGet("clinic/{clinicId}")]
        public async Task<IActionResult> GetByClinic(int clinicId)
        {
            var pickups = await _context.PickupRequests
                .Where(p => p.ClinicId == clinicId)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
            return Ok(pickups);
        }

        // POST: api/pickup
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePickupDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Generate a random 6-digit OTP
            var rand = new Random();
            var otp = rand.Next(100000, 999999).ToString();

            var pickup = new PickupRequest
            {
                ClinicId = dto.ClinicId,
                ClinicName = dto.ClinicName,
                DoctorName = dto.DoctorName,
                Phone = dto.Phone,
                Email = dto.Email,
                PickupDate = dto.PickupDate,
                PreferredTime = dto.PreferredTime,
                Address = dto.Address,
                ContactPerson = dto.ContactPerson,
                NumberOfCases = dto.NumberOfCases,
                SpecialNotes = dto.SpecialNotes,
                Status = "Pending",
                Otp = otp
            };

            _context.PickupRequests.Add(pickup);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Pickup request scheduled successfully.",
                pickupId = pickup.Id,
                otp = pickup.Otp,
                status = pickup.Status
            });
        }
    }

    public class CreatePickupDto
    {
        public int? ClinicId { get; set; }
        public string ClinicName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime PickupDate { get; set; }
        public string PreferredTime { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public int NumberOfCases { get; set; } = 1;
        public string? SpecialNotes { get; set; }
    }
}
