using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/patients")]
public class PatientsController : ControllerBase
{
    private readonly DentalDbContext _context;

    public PatientsController(DentalDbContext context)
    {
        _context = context;
    }

    // GET: api/patients
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
    {
        return await _context.Patients
            .Include(p => p.XRays)
            .Include(p => p.Visits)
            .ToListAsync();
    }

    // GET: api/patients/P-101
    [HttpGet("{id}")]
    public async Task<ActionResult<Patient>> GetPatient(string id)
    {
        var patient = await _context.Patients
            .Include(p => p.XRays)
            .Include(p => p.Visits)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (patient == null)
        {
            return NotFound(new { message = $"Patient with ID {id} not found." });
        }

        return patient;
    }

    // POST: api/patients
    [HttpPost]
    public async Task<ActionResult<Patient>> RegisterPatient(Patient newPatientData)
    {
        // Generate next ID like P-105
        var existingPatients = await _context.Patients.ToListAsync();
        int nextIdNum = 101;
        if (existingPatients.Any())
        {
            nextIdNum = existingPatients
                .Select(p => {
                    var numericPart = p.Id.Replace("P-", "");
                    return int.TryParse(numericPart, out int num) ? num : 0;
                })
                .Max() + 1;
        }

        var newPatient = new Patient
        {
            Id = $"P-{nextIdNum}",
            Name = newPatientData.Name,
            Age = newPatientData.Age,
            Gender = newPatientData.Gender,
            Phone = newPatientData.Phone,
            Email = newPatientData.Email,
            Address = newPatientData.Address,
            Insurance = newPatientData.Insurance ?? new(),
            MedicalAlerts = newPatientData.MedicalAlerts ?? new(),
            Chart = new(),
            TreatmentPlan = new(),
            XRays = new(),
            Visits = new()
        };

        _context.Patients.Add(newPatient);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPatient), new { id = newPatient.Id }, newPatient);
    }

    // PUT: api/patients/P-101
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePatient(string id, Patient updatedPatient)
    {
        if (id != updatedPatient.Id)
        {
            return BadRequest(new { message = "ID mismatch." });
        }

        var patient = await _context.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound(new { message = $"Patient with ID {id} not found." });
        }

        // Update properties
        patient.Name = updatedPatient.Name;
        patient.Age = updatedPatient.Age;
        patient.Gender = updatedPatient.Gender;
        patient.Phone = updatedPatient.Phone;
        patient.Email = updatedPatient.Email;
        patient.Address = updatedPatient.Address;
        patient.Insurance = updatedPatient.Insurance;
        patient.MedicalAlerts = updatedPatient.MedicalAlerts;
        patient.Chart = updatedPatient.Chart;
        patient.TreatmentPlan = updatedPatient.TreatmentPlan;

        _context.Entry(patient).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PatientExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // PUT: api/patients/P-101/chart
    [HttpPut("{id}/chart")]
    public async Task<IActionResult> UpdatePatientChart(string id, Dictionary<string, ToothChartItem> newChart)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound(new { message = $"Patient with ID {id} not found." });
        }

        patient.Chart = newChart;
        _context.Entry(patient).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/patients/P-101/visits
    [HttpPost("{id}/visits")]
    public async Task<ActionResult<VisitNote>> AddVisitNote(string id, VisitNoteRequest request)
    {
        var patient = await _context.Patients.FindAsync(id);
        if (patient == null)
        {
            return NotFound(new { message = $"Patient with ID {id} not found." });
        }

        var newNote = new VisitNote
        {
            PatientId = id,
            Date = DateTime.UtcNow.ToString("yyyy-MM-dd"),
            Notes = request.Notes
        };

        _context.VisitNotes.Add(newNote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(null, newNote);
    }

    private bool PatientExists(string id)
    {
        return _context.Patients.Any(e => e.Id == id);
    }
}

public class VisitNoteRequest
{
    public required string Notes { get; set; }
}
