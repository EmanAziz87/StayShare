using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace stayshare.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
    }
    
    // Remove the Users DbSet since it's now handled by IdentityDbContext
    // public DbSet<User> Users { get; set; }  // Remove this line
    public DbSet<Chore> Chores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); // This is important!
        
        // Add any additional model configurations here
    }
}
