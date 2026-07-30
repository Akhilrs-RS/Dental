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
    public class LabCasesController : ControllerBase
    {
        private readonly J3DbContext _context;

        public LabCasesController(J3DbContext context)
        {
            _context = context;
        }

        // GET: api/labcases
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cases = await _context.LabCases
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
            return Ok(cases);
        }

        // POST: api/labcases
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LabCase dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var labCase = new LabCase
            {
                PatientName = dto.PatientName ?? string.Empty,
                PatientAge = dto.PatientAge ?? string.Empty,
                Gender = dto.Gender ?? string.Empty,
                ClinicName = dto.ClinicName ?? string.Empty,
                DoctorName = dto.DoctorName ?? string.Empty,
                MobileNumber = dto.MobileNumber ?? string.Empty,
                ExpectedDeliveryDate = dto.ExpectedDeliveryDate ?? string.Empty,
                Priority = dto.Priority ?? "Normal",
                Materials = dto.Materials ?? string.Empty,
                TeethConfig = dto.TeethConfig ?? string.Empty,
                DeliveryOption = dto.DeliveryOption ?? string.Empty,
                Notes = dto.Notes ?? string.Empty,
                Status = "Pending"
            };

            _context.LabCases.Add(labCase);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Lab case submitted successfully.",
                caseId = labCase.Id,
                status = labCase.Status
            });
        }
        
        // PUT: api/labcases/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateLabCaseStatusDto dto)
        {
            var labCase = await _context.LabCases.FindAsync(id);
            if (labCase == null) return NotFound("Lab case not found");

            labCase.Status = dto.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated successfully" });
        }
    }

    public class UpdateLabCaseStatusDto
    {
        public string Status { get; set; } = string.Empty;
    }
}
