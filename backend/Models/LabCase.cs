using System;

namespace J3Dental.Api.Models
{
    public class LabCase
    {
        public int Id { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string PatientAge { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string ClinicName { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string ExpectedDeliveryDate { get; set; } = string.Empty;
        public string Priority { get; set; } = "Normal";
        public string Materials { get; set; } = string.Empty;
        public string TeethConfig { get; set; } = string.Empty;
        public string DeliveryOption { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
