using System;

namespace J3Dental.Api.Models
{
    public class PickupRequest
    {
        public int Id { get; set; }
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
        public string Status { get; set; } = "Pending";
        public string? Otp { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
