using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Appointment
{
    [Key]
    public required string Id { get; set; } // e.g. "apt-1"
    public required string PatientId { get; set; }
    public required string PatientName { get; set; }
    public required string Time { get; set; } // e.g. "09:00"
    public int Duration { get; set; } // minutes
    public required string Room { get; set; } // e.g. "Operatory A"
    public required string Dentist { get; set; } // e.g. "Dr. Sarah Carter"
    public required string Type { get; set; } // e.g. "Filling (#3 MOD)"
    public required string Status { get; set; } // e.g. "confirmed", "checked-in", "completed", "scheduled"
    public required string Date { get; set; } // e.g. "2026-06-19"
}
