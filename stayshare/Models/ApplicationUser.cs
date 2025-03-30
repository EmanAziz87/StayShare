using Microsoft.AspNetCore.Identity;

namespace stayshare.Models;

public class ApplicationUser : IdentityUser
{
    public int? ResidenceId { get; set; } 
    public Residence Residence { get; set; }
    public int TotalChoreCount { get; set; } = 0;
    public ICollection<Residence> ManagedResidences { get; set; } = new List<Residence>();
    public ICollection<ResidentChores> AssignedChores { get; set; } = new List<ResidentChores>();
}
