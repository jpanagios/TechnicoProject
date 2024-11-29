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
            // Σχέση: User -> Property (One-to-Many)
            modelBuilder.Entity<Property>()
                .HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Σχέση: Property -> Repair (One-to-Many)
            modelBuilder.Entity<Repair>()
                .HasOne(r => r.Property)
                .WithMany(p => p.Repairs)
                .HasForeignKey(r => r.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            // Προσθήκη νέων πεδίων στο Repair
            modelBuilder.Entity<Repair>()
                .Property(r => r.Status)
                .HasDefaultValue("Pending");

            modelBuilder.Entity<Repair>()
                .Property(r => r.Type)
                .IsRequired();

            // Ρύθμιση του πεδίου Cost με ακρίβεια
            modelBuilder.Entity<Repair>()
                .Property(r => r.Cost)
                .IsRequired()
                .HasColumnType("decimal(18,2)"); // Ορίζει ακρίβεια 2 δεκαδικών ψηφίων

            modelBuilder.Entity<Repair>()
                .Property(r => r.RepairAddress)
                .IsRequired(false);

            // Μοναδικότητα στο Email του User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Μοναδικότητα στο PhoneNumber του User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.PhoneNumber)
                .IsUnique();

            // Μοναδικότητα Property (UserId και Address)
            modelBuilder.Entity<Property>()
                .HasIndex(p => new { p.UserId, p.Address })
                .IsUnique();

            // Μοναδικότητα Repair (PropertyId και RepairDate)
            modelBuilder.Entity<Repair>()
                .HasIndex(r => new { r.PropertyId, r.RepairDate })
                .IsUnique();
        }
    }
}
