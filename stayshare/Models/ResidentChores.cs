namespace stayshare.Models;

public class ResidentChores
{
    public int Id { get; set; }
    public string ResidentId { get; set; }
    public ApplicationUser User { get; set; }
    
    public int ChoreId { get; set; }
    public Chore Chore { get; set; }
    
    public DateTime AssignedDate { get; set; } = DateTime.UtcNow;
    
    public bool IsCompleted { get; set; } = false;
    
    
}