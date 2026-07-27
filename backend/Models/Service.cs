namespace J3Dental.Api.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Num { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Cases { get; set; }
        public string? Products { get; set; }
        public string? Options { get; set; }
        public string? Turnaround { get; set; }
    }
}
