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
    public DbSet<ResidentChores> ResidentChores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<ApplicationUser>()
            .HasOne(u => u.Residence)
            .WithMany(r => r.Users)
            .HasForeignKey(u => u.ResidenceId)
            .IsRequired(false); 
        
        modelBuilder.Entity<Residence>()
            .HasOne(r => r.Admin)
            .WithMany(u => u.ManagedResidences)
            .HasForeignKey(r => r.AdminId)
            .OnDelete(DeleteBehavior.Restrict); // Preventing cascade delete

        modelBuilder.Entity<Chore>()
            .HasOne(c => c.Residence)
            .WithMany(r => r.Chores)
            .HasForeignKey(c => c.ResidenceId)
            .OnDelete(DeleteBehavior.Cascade);
        
        
        modelBuilder.Entity<ResidentChores>()
            .HasOne(rc => rc.User)
            .WithMany(u => u.AssignedChores)
            .HasForeignKey(rc => rc.ResidentId);

        modelBuilder.Entity<ResidentChores>()
            .HasOne(rc => rc.Chore)
            .WithMany(c => c.AssignedUsers)
            .HasForeignKey(rc => rc.ChoreId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
