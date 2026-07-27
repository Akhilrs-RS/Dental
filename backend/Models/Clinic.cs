using System;

namespace J3Dental.Api.Models
{
    public class Clinic
    {
        public int Id { get; set; }
        public string ClinicName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? GstNumber { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Pincode { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
