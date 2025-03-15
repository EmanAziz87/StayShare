using stayshare.Models;

namespace stayshare.Repositories.Interfaces;

public interface IResidenceRepository
{
    Task<IEnumerable<Residence>> GetAllAsync();
    Task<Residence> GetByIdAsync(int id);
    Task<Residence> CreateAsync(Residence residence);
    Task<Residence> UpdateAsync(Residence residence);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<Residence>> GetByAdminIdAsync(string adminId);
    Task<Residence> GetResidenceWithUsersAsync(string passcode);
    Task<Residence> AddUserToResidenceAsync(ApplicationUser user, string passcode);
}