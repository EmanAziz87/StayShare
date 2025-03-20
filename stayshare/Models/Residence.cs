namespace stayshare.Models;

public class Residence
{
    public int Id { get; set; }
    public string ResidenceName { get; set; }
    
    public string Passcode { get; set; }
    public string AdminId { get; set; }
    
    public ApplicationUser Admin { get; set; }
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
    public ICollection<Chore> Chores { get; set; } = new List<Chore>();
}