namespace stayshare.Models;

public class Residence
{
    public int Id { get; set; }
    public string ResidenceName { get; set; }
    
    public string Passcode { get; set; }
    public string AdminId { get; set; }
    
    // navigation properties that allow for easy access to related data, in this case, a residences admin and users
    // these properties won't add any columns to the database,
    
    // but instead acts as a means of accessing related data in an object-oriented way.
    
    // var admin = residence.Admin // you can access Admin through residences
    // will implicitly cause EF to use the AdminId to find the admin associated with that residence
    public ApplicationUser Admin { get; set; }
    
    // var users = residence.Users // you can access Users through residences
    // will implicitly cause EF to use the ResidenceId (foreignKey in users table) to find the
    // users associated with that residence.
    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();
    public ICollection<Chore> Chores { get; set; } = new List<Chore>();
}