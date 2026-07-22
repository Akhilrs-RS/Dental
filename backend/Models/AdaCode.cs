using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class AdaCode
{
    [Key]
    public required string Code { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public decimal Price { get; set; }
}
