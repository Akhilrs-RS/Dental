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
    public class ContactController : ControllerBase
    {
        private readonly J3DbContext _context;

        public ContactController(J3DbContext context)
        {
            _context = context;
        }

        // GET: api/contact
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var enquiries = await _context.ContactEnquiries
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
            return Ok(enquiries);
        }

        // POST: api/contact
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEnquiryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var enquiry = new ContactEnquiry
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Subject = dto.Subject,
                Message = dto.Message
            };

            _context.ContactEnquiries.Add(enquiry);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Enquiry submitted successfully.", enquiryId = enquiry.Id });
        }
    }

    public class CreateEnquiryDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
