namespace stayshare.Models;

public class Chore
{
    public int Id { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime CompleteBy { get; set; }
    public bool Completed { get; set; }
    public string Comment { get; set; }
}    