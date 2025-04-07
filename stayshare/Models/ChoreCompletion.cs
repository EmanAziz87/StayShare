
using System.Text.Json.Serialization;

namespace stayshare.Models;

public class ChoreCompletion
{
    public int Id { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ChoreCompletionStatus Status { get; set; } = ChoreCompletionStatus.Pending;
    public DateTime SpecificAssignedDate { get; set; }
    public int RejectionCount { get; set; } = 0;
    public bool Retired { get; set; } = false;
    public int ResidentChoresId { get; set; }
    public ResidentChores ResidentChores { get; set; }
}

public enum ChoreCompletionStatus
{
    Pending,
    Approved,
    Rejected
}