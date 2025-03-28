namespace stayshare.Models;
public class Chore
{
    public int Id { get; set; }
    public string TaskName { get; set; }
    public int IntervalDays { get; set; }
    public int ResidenceId { get; set; }
    public Residence Residence { get; set; }
    public ICollection<ResidentChores> AssignedUsers { get; set; } = new List<ResidentChores>();
}    