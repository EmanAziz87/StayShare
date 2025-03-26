namespace stayshare.Models;

public class ResidentChores
{
    public int Id { get; set; }
    public string ResidentId { get; set; }
    public ApplicationUser User { get; set; }
    public int ChoreId { get; set; }
    public Chore Chore { get; set; }
    
    public DateTime AssignedDate { get; set; } = DateTime.UtcNow;

    public int CompletionCount { get; set; } = 0;

    public ICollection<ChoreCompletion> ChoreCompletions = new List<ChoreCompletion>();


}