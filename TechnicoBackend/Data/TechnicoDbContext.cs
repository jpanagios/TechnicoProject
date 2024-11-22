using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Models;

namespace TechnicoBackend.Data
{
    public class TechnicoDbContext : DbContext
    {
        public TechnicoDbContext(DbContextOptions<TechnicoDbContext> options) : base(options) { }

        // Υπάρχοντα DbSet
        public DbSet<PropertyOwner> PropertyOwners { get; set; } = null!;
        public DbSet<PropertyItem> PropertyItems { get; set; } = null!;
        public DbSet<Repair> Repairs { get; set; } = null!;
        public DbSet<PropertyOwnerPropertyItem> PropertyOwnerPropertyItems { get; set; } = null!;

        // Νέο DbSet για το User
        public DbSet<User> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Σχέσεις για PropertyOwnerPropertyItem
            modelBuilder.Entity<PropertyOwnerPropertyItem>()
                .HasKey(p => new { p.PropertyOwnerId, p.PropertyItemId });

            modelBuilder.Entity<PropertyOwnerPropertyItem>()
                .HasOne(po => po.PropertyOwner)
                .WithMany(po => po.PropertyOwnerPropertyItems)
                .HasForeignKey(po => po.PropertyOwnerId);

            modelBuilder.Entity<PropertyOwnerPropertyItem>()
                .HasOne(pi => pi.PropertyItem)
                .WithMany(pi => pi.PropertyOwnerPropertyItems)
                .HasForeignKey(pi => pi.PropertyItemId);

            // Ρύθμιση για User (προαιρετικά indexes, unique constraints)
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique(); // Το Email πρέπει να είναι μοναδικό
        }
    }
}
