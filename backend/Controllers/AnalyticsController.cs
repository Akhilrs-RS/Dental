using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly DentalDbContext _context;

    public AnalyticsController(DentalDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetAnalytics()
    {
        // 1. Calculate Active Patients
        int dbPatientsCount = await _context.Patients.CountAsync();
        int activePatients = 1416 + dbPatientsCount; // Base baseline + db patients

        // 2. Calculate Revenue from completed treatment plan items in DB
        // Let's inspect the treatment plans of all patients
        var patients = await _context.Patients.ToListAsync();
        decimal totalCompletedRevenue = 0;
        decimal dailyCompletedRevenue = 0;
        
        // Count procedure categories
        int diagnosticCount = 0;
        int preventiveCount = 0;
        int restorativeCount = 0;
        int endodonticCount = 0;
        int surgeryCount = 0;

        foreach (var p in patients)
        {
            if (p.TreatmentPlan != null)
            {
                foreach (var item in p.TreatmentPlan)
                {
                    if (item.Status == "completed")
                    {
                        totalCompletedRevenue += item.Price;
                        // Just as a simple dynamic rule, let's treat some of it as daily if it was completed recently
                        dailyCompletedRevenue += item.Price * 0.1m; // 10% simulated daily component
                    }

                    // Count categories by ADA code prefixes or categories
                    var category = GetCategoryForCode(item.Code);
                    switch (category)
                    {
                        case "Diagnostic": diagnosticCount++; break;
                        case "Preventive": preventiveCount++; break;
                        case "Restorative": restorativeCount++; break;
                        case "Endodontic": endodonticCount++; break;
                        case "Surgery & Implants": surgeryCount++; break;
                    }
                }
            }
        }

        // 3. Base calculations on seeded baseline + live updates
        decimal dailyRevenue = 2850 + dailyCompletedRevenue;
        decimal monthlyRevenue = 64200 + totalCompletedRevenue;

        // 4. Calculate occupancy rate based on number of appointments
        int appointmentsCount = await _context.Appointments.CountAsync();
        int occupancyRate = Math.Min(100, 60 + (appointmentsCount * 5)); // Base 60% + 5% per appointment

        // 5. Build dynamic procedure breakdown (with fallback percentages if counts are zero)
        int totalProcedures = diagnosticCount + preventiveCount + restorativeCount + endodonticCount + surgeryCount;
        double diagVal = totalProcedures > 0 ? (double)diagnosticCount / totalProcedures * 100 : 35;
        double prevVal = totalProcedures > 0 ? (double)preventiveCount / totalProcedures * 100 : 25;
        double restVal = totalProcedures > 0 ? (double)restorativeCount / totalProcedures * 100 : 20;
        double endoVal = totalProcedures > 0 ? (double)endodonticCount / totalProcedures * 100 : 12;
        double surgVal = totalProcedures > 0 ? (double)surgeryCount / totalProcedures * 100 : 8;

        var procedureBreakdown = new List<object>
        {
            new { name = "Diagnostic", value = Math.Round(diagVal, 0), color = "#0284c7" },
            new { name = "Preventive", value = Math.Round(prevVal, 0), color = "#10b981" },
            new { name = "Restorative", value = Math.Round(restVal, 0), color = "#8b5cf6" },
            new { name = "Endodontic", value = Math.Round(endoVal, 0), color = "#06b6d4" },
            new { name = "Surgery & Implants", value = Math.Round(surgVal, 0), color = "#ec4899" }
        };

        // 6. Revenue history
        var revenueHistory = new List<object>
        {
            new { month = "Jan", amount = 52000 },
            new { month = "Feb", amount = 58000 },
            new { month = "Mar", amount = 61000 },
            new { month = "Apr", amount = 69000 },
            new { month = "May", amount = 62000 },
            new { month = "Jun", amount = (int)monthlyRevenue }
        };

        return new
        {
            dailyRevenue = (int)dailyRevenue,
            monthlyRevenue = (int)monthlyRevenue,
            occupancyRate,
            activePatients,
            procedureBreakdown,
            revenueHistory
        };
    }

    private string GetCategoryForCode(string code)
    {
        // Simple mapping
        return code switch
        {
            "D0120" or "D0220" or "D0274" => "Diagnostic",
            "D1110" or "D1208" => "Preventive",
            "D2391" or "D2393" or "D2740" => "Restorative",
            "D3330" => "Endodontic",
            _ => "Surgery & Implants"
        };
    }
}
