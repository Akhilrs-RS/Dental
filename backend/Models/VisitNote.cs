using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models;

public class VisitNote
{
    [Key]
    public int Id { get; set; }
    public required string PatientId { get; set; }
    public required string Date { get; set; }
    public required string Notes { get; set; }

    [ForeignKey("PatientId")]
    [JsonIgnore]
    public Patient? Patient { get; set; }
}
