using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/appointments")]
public class AppointmentsController : ControllerBase
{
    private readonly DentalDbContext _context;

    public AppointmentsController(DentalDbContext context)
    {
        _context = context;
    }

    // GET: api/appointments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
    {
        return await _context.Appointments.ToListAsync();
    }

    // GET: api/appointments/apt-1
    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointment(string id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound(new { message = $"Appointment with ID {id} not found." });
        }

        return appointment;
    }

    // POST: api/appointments
    [HttpPost]
    public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
    {
        // If ID is not provided or empty, generate one
        if (string.IsNullOrEmpty(appointment.Id))
        {
            appointment.Id = "apt-" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        }

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
    }

    // PUT: api/appointments/apt-1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAppointment(string id, Appointment updatedAppointment)
    {
        if (id != updatedAppointment.Id)
        {
            return BadRequest(new { message = "ID mismatch." });
        }

        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound(new { message = $"Appointment with ID {id} not found." });
        }

        // Update fields
        appointment.PatientId = updatedAppointment.PatientId;
        appointment.PatientName = updatedAppointment.PatientName;
        appointment.Time = updatedAppointment.Time;
        appointment.Duration = updatedAppointment.Duration;
        appointment.Room = updatedAppointment.Room;
        appointment.Dentist = updatedAppointment.Dentist;
        appointment.Type = updatedAppointment.Type;
        appointment.Status = updatedAppointment.Status;
        appointment.Date = updatedAppointment.Date;

        _context.Entry(appointment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AppointmentExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/appointments/apt-1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(string id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound(new { message = $"Appointment with ID {id} not found." });
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AppointmentExists(string id)
    {
        return _context.Appointments.Any(e => e.Id == id);
    }
}
