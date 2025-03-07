using Microsoft.EntityFrameworkCore;

namespace stayshare.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    
    
    public DbSet<User> Users { get; set; }
    public DbSet<Chore> Chores { get; set; }
}