using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace stayshare.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }
    public DbSet<Chore> Chores { get; set; }
    public DbSet<Residence> Residences { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configuring one-to-many relationship for tenants
        modelBuilder.Entity<ApplicationUser>()
            // we establish that a user can have one residence
            .HasOne(u => u.Residence)
            // because of the previous line, r is inferred to be a residence
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.ResidenceId)
            .IsRequired(false); 
        
        // Configuring one-to-many relationship for admin
        modelBuilder.Entity<Residence>()
            // r.Admin can be accessed due to the navigation property in Residence
            .HasOne(r => r.Admin)
            // u.ManagedResidences can be accessed due to the navigation property in ApplicationUser
            .WithMany(u => u.ManagedResidences)
            .HasForeignKey(r => r.AdminId)
            .OnDelete(DeleteBehavior.Restrict); // Preventing cascade delete
    }
}
