using Microsoft.EntityFrameworkCore;
using J3Dental.Api.Models;

namespace J3Dental.Api.Database
{
    public class J3DbContext : DbContext
    {
        public J3DbContext(DbContextOptions<J3DbContext> options) : base(options)
        {
        }

        public DbSet<Clinic> Clinics { get; set; }
        public DbSet<PickupRequest> PickupRequests { get; set; }
        public DbSet<ContactEnquiry> ContactEnquiries { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Service> Services { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Clinic Email unique index
            modelBuilder.Entity<Clinic>()
                .HasIndex(c => c.Email)
                .IsUnique();

            // Configure Decimal precision for Product Price
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(10, 2);
        }
    }
}
