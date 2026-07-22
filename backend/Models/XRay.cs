using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class XRay
{
    [Key]
    public required string Id { get; set; } // e.g. "xr-1"
    public required string PatientId { get; set; }
    public required string Label { get; set; }
    public required string Date { get; set; }
    public required string Type { get; set; } // e.g. "bitewing", "periapical", "panoramic", "fms"

    [ForeignKey("PatientId")]
    [JsonIgnore]
    public Patient? Patient { get; set; }
}
