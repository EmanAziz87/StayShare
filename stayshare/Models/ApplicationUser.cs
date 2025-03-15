using Microsoft.AspNetCore.Identity;

namespace stayshare.Models;

public class ApplicationUser : IdentityUser
{
    // 1. Sets a foreign key in the ApplicationUser table
    public int? ResidenceId { get; set; } // 1
    
    /* 2. Navigation property for the residence. navigation properties are used to define relationships between entities
       and allow for easy access to related data. Navigation properties won't add any columns to the database, but 
       instead acts as a means of accessing related data in an object-oriented way.
    
       var residenceName = user.Residence.ResidenceName // you can access Residence through users;
       will implicitly cause EF to use the ResidenceId to find the residence associated with that user
    */
    public Residence Residence { get; set; } // 2
    
    /* 3. Can do the same thing with this Collection navigation property:
         var residences = user.ManagedResidences // you can access ManagedResidences through users;
         will implicitly cause EF to use the AdminId to find the residences associated with that user         
    */
    public ICollection<Residence> ManagedResidences { get; set; } = new List<Residence>(); // 3
}
