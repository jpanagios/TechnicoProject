using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Models;

namespace TechnicoBackend.Data
{
    public class TechnicoDbContext : DbContext
    {
        public TechnicoDbContext(DbContextOptions<TechnicoDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Property> Properties { get; set; } = null!;
        public DbSet<Repair> Repairs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Σχέση: User -> Property (1-N)
            modelBuilder.Entity<Property>()
                .HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Σχέση: Property -> Repair (1-N)
            modelBuilder.Entity<Repair>()
                .HasOne(r => r.Property)
                .WithMany(p => p.Repairs)
                .HasForeignKey(r => r.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            // Unique Constraint για Email στο User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email).IsUnique();

            // Unique Constraint για PhoneNumber στο User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.PhoneNumber).IsUnique();

            // Unique Constraint για Property (UserId και Address)
            modelBuilder.Entity<Property>()
                .HasIndex(p => new { p.UserId, p.Address }).IsUnique();

            // Unique Constraint για Repair (PropertyId και RepairDate)
            modelBuilder.Entity<Repair>()
                .HasIndex(r => new { r.PropertyId, r.RepairDate }).IsUnique();
        }
    }
}
