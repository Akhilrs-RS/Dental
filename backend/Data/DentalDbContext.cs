using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;
using backend.Models;

namespace backend.Data;

public class DentalDbContext : DbContext
{
    public DentalDbContext(DbContextOptions<DentalDbContext> options) : base(options)
    {
    }

    public DbSet<AdaCode> AdaCodes => Set<AdaCode>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<VisitNote> VisitNotes => Set<VisitNote>();
    public DbSet<XRay> XRays => Set<XRay>();
    public DbSet<Appointment> Appointments => Set<Appointment>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        // Value converters for JSON serialization
        var insuranceConverter = new ValueConverter<InsuranceDetails, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<InsuranceDetails>(v, options) ?? new()
        );

        var medicalAlertsConverter = new ValueConverter<List<string>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<List<string>>(v, options) ?? new()
        );

        var chartConverter = new ValueConverter<Dictionary<string, ToothChartItem>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<Dictionary<string, ToothChartItem>>(v, options) ?? new()
        );

        var treatmentPlanConverter = new ValueConverter<List<TreatmentPlanItem>, string>(
            v => JsonSerializer.Serialize(v, options),
            v => JsonSerializer.Deserialize<List<TreatmentPlanItem>>(v, options) ?? new()
        );

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.Property(p => p.Insurance)
                .HasConversion(insuranceConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.MedicalAlerts)
                .HasConversion(medicalAlertsConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.Chart)
                .HasConversion(chartConverter)
                .HasColumnType("longtext");

            entity.Property(p => p.TreatmentPlan)
                .HasConversion(treatmentPlanConverter)
                .HasColumnType("longtext");
        });
    }

    public static void SeedData(DentalDbContext context)
    {
        context.Database.EnsureCreated();

        if (!context.AdaCodes.Any())
        {
            context.AdaCodes.AddRange(new List<AdaCode>
            {
                new() { Code = "D0120", Name = "Periodic Oral Evaluation", Category = "Diagnostic", Price = 65 },
                new() { Code = "D0220", Name = "Intraoral Radiograph (Periapical)", Category = "Diagnostic", Price = 45 },
                new() { Code = "D0274", Name = "Bitewing Radiographs (4 images)", Category = "Diagnostic", Price = 85 },
                new() { Code = "D1110", Name = "Prophylaxis (Adult Cleaning)", Category = "Preventive", Price = 95 },
                new() { Code = "D1208", Name = "Topical Application of Fluoride", Category = "Preventive", Price = 40 },
                new() { Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Category = "Restorative", Price = 185 },
                new() { Code = "D2393", Name = "Resin Composite - 3 Surfaces (Posterior)", Category = "Restorative", Price = 260 },
                new() { Code = "D2740", Name = "Crown - Porcelain/Ceramic", Category = "Restorative", Price = 1250 },
                new() { Code = "D3330", Name = "Endodontic Therapy (Molar RCT)", Category = "Endodontic", Price = 980 },
                new() { Code = "D4341", Name = "Periodontal Scaling & Root Planing", Category = "Periodontal", Price = 210 },
                new() { Code = "D6010", Name = "Surgical Placement of Implant Body", Category = "Implant", Price = 2400 },
                new() { Code = "D7140", Name = "Extraction - Erupted Tooth/Exposed Root", Category = "Oral Surgery", Price = 220 }
            });
            context.SaveChanges();
        }

        if (!context.Patients.Any())
        {
            var p1 = new Patient
            {
                Id = "P-101",
                Name = "Eleanor Vance",
                Age = 34,
                Gender = "Female",
                Phone = "(555) 123-4567",
                Email = "eleanor.vance@example.com",
                Address = "742 Evergreen Terrace, Springfield",
                Insurance = new InsuranceDetails
                {
                    Provider = "Delta Dental PPO",
                    PolicyNumber = "DD-98721A",
                    CoveragePercent = 80,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Penicillin Allergy", "Low Blood Pressure" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["3"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "occlusal", "distal" }
                    },
                    ["14"] = new()
                    {
                        Condition = "filling",
                        Surfaces = new() { "occlusal" },
                        Treatments = new() { new() { Type = "filling", Date = "2025-11-14", Code = "D2391", Notes = "Amalgam replaced with composite" } }
                    },
                    ["19"] = new()
                    {
                        Condition = "crown",
                        Surfaces = new() { "all" },
                        Treatments = new() { new() { Type = "crown", Date = "2026-01-20", Code = "D2740", Notes = "Porcelain crown placed on 19" } }
                    },
                    ["32"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2024-05-10", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-1", Code = "D0220", Name = "Intraoral Radiograph (Periapical)", Tooth = "3", Price = 45, Status = "approved" },
                    new() { Id = "tp-2", Code = "D2393", Name = "Resin Composite - 3 Surfaces (Posterior)", Tooth = "3", Price = 260, Status = "planned" }
                }
            };

            var p2 = new Patient
            {
                Id = "P-102",
                Name = "Marcus Sterling",
                Age = 48,
                Gender = "Male",
                Phone = "(555) 987-6543",
                Email = "marcus.s@example.com",
                Address = "1012 Baker St, London District",
                Insurance = new InsuranceDetails
                {
                    Provider = "Cigna Dental Premium",
                    PolicyNumber = "CIG-88219B",
                    CoveragePercent = 90,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Hypertension", "Aspirin Sensitivity" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["8"] = new()
                    {
                        Condition = "fracture",
                        Surfaces = new() { "incisal" }
                    },
                    ["30"] = new()
                    {
                        Condition = "rct",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "rct", Date = "2025-08-04", Code = "D3330", Notes = "Root canal performed by Dr. Aris" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-3", Code = "D2740", Name = "Crown - Porcelain/Ceramic", Tooth = "8", Price = 1250, Status = "planned" }
                }
            };

            var p3 = new Patient
            {
                Id = "P-103",
                Name = "Chloe Park",
                Age = 22,
                Gender = "Female",
                Phone = "(555) 456-7890",
                Email = "chloe.p@example.com",
                Address = "456 University Way, Berkeley",
                Insurance = new InsuranceDetails
                {
                    Provider = "MetLife Dental",
                    PolicyNumber = "MET-44102C",
                    CoveragePercent = 70,
                    DeductibleMet = false
                },
                MedicalAlerts = new List<string>(),
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["17"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted due to impaction" } }
                    },
                    ["18"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    },
                    ["31"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    },
                    ["32"] = new()
                    {
                        Condition = "missing",
                        Surfaces = new(),
                        Treatments = new() { new() { Type = "extraction", Date = "2025-02-12", Code = "D7140", Notes = "Wisdom tooth extracted" } }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-6", Code = "D1110", Name = "Prophylaxis (Adult Cleaning)", Tooth = "General", Price = 95, Status = "planned" }
                }
            };

            var p4 = new Patient
            {
                Id = "P-104",
                Name = "Samuel Henderson",
                Age = 62,
                Gender = "Male",
                Phone = "(555) 789-0123",
                Email = "sam.h@example.com",
                Address = "89 Main St, North Andover",
                Insurance = new InsuranceDetails
                {
                    Provider = "Aetna Dental PPO",
                    PolicyNumber = "AET-10293D",
                    CoveragePercent = 50,
                    DeductibleMet = true
                },
                MedicalAlerts = new List<string> { "Type 2 Diabetes", "Takes Blood Thinners" },
                Chart = new Dictionary<string, ToothChartItem>
                {
                    ["12"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "mesial", "buccal" }
                    },
                    ["20"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "occlusal" }
                    },
                    ["21"] = new()
                    {
                        Condition = "decay",
                        Surfaces = new() { "lingual" }
                    }
                },
                TreatmentPlan = new List<TreatmentPlanItem>
                {
                    new() { Id = "tp-4", Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Tooth = "12", Price = 185, Status = "planned" },
                    new() { Id = "tp-5", Code = "D2391", Name = "Resin Composite - 1 Surface (Posterior)", Tooth = "20", Price = 185, Status = "planned" }
                }
            };

            context.Patients.AddRange(p1, p2, p3, p4);
            context.SaveChanges();

            // Seed XRays
            context.XRays.AddRange(new List<XRay>
            {
                new() { Id = "xr-1", PatientId = "P-101", Label = "Left Bitewing (14, 15, 16)", Date = "2026-03-12", Type = "bitewing" },
                new() { Id = "xr-2", PatientId = "P-101", Label = "Lower Right Periapical (30, 31)", Date = "2026-03-12", Type = "periapical" },
                new() { Id = "xr-3", PatientId = "P-102", Label = "Anterior Panorex (7, 8, 9)", Date = "2026-05-18", Type = "panoramic" },
                new() { Id = "xr-4", PatientId = "P-103", Label = "Full Mouth Series", Date = "2026-02-10", Type = "fms" },
                new() { Id = "xr-5", PatientId = "P-104", Label = "Upper Left Quadrant PA", Date = "2026-06-01", Type = "periapical" }
            });

            // Seed Visits
            context.VisitNotes.AddRange(new List<VisitNote>
            {
                new() { PatientId = "P-101", Date = "2026-03-12", Notes = "Routine checkup. Found active decay on tooth #3 distal-occlusal. Scheduled treatment plan." },
                new() { PatientId = "P-101", Date = "2026-01-20", Notes = "Permanent porcelain crown cementation on tooth #19. Bite checked and verified." },
                new() { PatientId = "P-102", Date = "2026-05-18", Notes = "Patient presented with chipped tooth #8 after minor fall. Recommend composite restoration or veneer." },
                new() { PatientId = "P-103", Date = "2026-02-10", Notes = "Hygienist cleaning. No active cavities detected. Plaque index low." },
                new() { PatientId = "P-104", Date = "2026-06-01", Notes = "Comprehensive evaluation. Noted active decay on #12, #20, and #21. Patient advised to monitor blood sugar prior to treatment appointments." }
            });

            context.SaveChanges();
        }

        if (!context.Appointments.Any())
        {
            context.Appointments.AddRange(new List<Appointment>
            {
                new()
                {
                    Id = "apt-1",
                    PatientId = "P-101",
                    PatientName = "Eleanor Vance",
                    Time = "09:00",
                    Duration = 60,
                    Room = "Operatory A",
                    Dentist = "Dr. Sarah Carter",
                    Type = "Filling (#3 MOD)",
                    Status = "confirmed",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-2",
                    PatientId = "P-102",
                    PatientName = "Marcus Sterling",
                    Time = "10:30",
                    Duration = 45,
                    Room = "Operatory A",
                    Dentist = "Dr. Sarah Carter",
                    Type = "Composite (#8)",
                    Status = "checked-in",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-3",
                    PatientId = "P-103",
                    PatientName = "Chloe Park",
                    Time = "09:00",
                    Duration = 60,
                    Room = "Hygiene Room",
                    Dentist = "Hygienist Amy Miller",
                    Type = "Prophylaxis & Fluoride",
                    Status = "completed",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-4",
                    PatientId = "P-104",
                    PatientName = "Samuel Henderson",
                    Time = "11:15",
                    Duration = 90,
                    Room = "Operatory B",
                    Dentist = "Dr. James Aris",
                    Type = "Consultation & X-Rays",
                    Status = "scheduled",
                    Date = "2026-06-19"
                },
                new()
                {
                    Id = "apt-5",
                    PatientId = "P-101",
                    PatientName = "Eleanor Vance",
                    Time = "13:00",
                    Duration = 45,
                    Room = "Operatory B",
                    Dentist = "Dr. James Aris",
                    Type = "Post-Op Follow-up",
                    Status = "scheduled",
                    Date = "2026-06-19"
                }
            });
            context.SaveChanges();
        }
    }
}
