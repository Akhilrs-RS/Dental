using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Patient
{
    [Key]
    public required string Id { get; set; } // e.g. "P-101"
    public required string Name { get; set; }
    public int Age { get; set; }
    public required string Gender { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;

    // JSON columns
    public InsuranceDetails Insurance { get; set; } = new();
    public List<string> MedicalAlerts { get; set; } = new();
    public Dictionary<string, ToothChartItem> Chart { get; set; } = new();
    public List<TreatmentPlanItem> TreatmentPlan { get; set; } = new();

    // Relationships
    public List<XRay> XRays { get; set; } = new();
    public List<VisitNote> Visits { get; set; } = new();
}

public class InsuranceDetails
{
    public string Provider { get; set; } = string.Empty;
    public string PolicyNumber { get; set; } = string.Empty;
    public int CoveragePercent { get; set; }
    public bool DeductibleMet { get; set; }
}

public class ToothChartItem
{
    public string Condition { get; set; } = string.Empty; // e.g. "decay", "filling", "crown", "missing", "fracture", "rct"
    public List<string> Surfaces { get; set; } = new(); // e.g. ["occlusal", "distal", "mesial", "buccal", "lingual", "all"]
    public List<TreatmentDetails> Treatments { get; set; } = new();
}

public class TreatmentDetails
{
    public string Type { get; set; } = string.Empty; // e.g. "filling", "crown", "extraction", "rct"
    public string Date { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
}

public class TreatmentPlanItem
{
    public string Id { get; set; } = string.Empty; // e.g. "tp-1"
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Tooth { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Status { get; set; } = "planned"; // planned, approved, completed
}
