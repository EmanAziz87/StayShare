using System.Runtime.InteropServices.JavaScript;

namespace stayshare.Models;

public class ChoreCompletion
{
    public int Id { get; set; }
    public bool Completed { get; set; }
    public DateTime SpecificAssignedDate { get; set; }
    public int ResidentChoresId { get; set; }
    public ResidentChores ResidentChores { get; set; }
}

// When you enter choreHome in the frontend, call api.get(by year/month/day) to retrieve choreCompletion for that day and chore.
// if the repository returns null, in the service layer, you will call the create repository method to create a new
// choreCompletion record with default values.