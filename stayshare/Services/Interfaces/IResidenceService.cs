using stayshare.Models;

namespace stayshare.Services.Interfaces;

public interface IResidenceService
{
    Task<IEnumerable<Residence>> GetAllResidencesAsync();
    Task<Residence> GetResidenceByIdAsync(int id);
    Task<Residence> CreateResidenceAsync(Residence residence);
    Task<Residence> UpdateResidenceAsync(int id, Residence residence);
    Task<bool> DeleteResidenceAsync(int id);
    Task<IEnumerable<Residence>> GetResidencesByAdminAsync(string adminId);
    Task<Residence> GetResidenceWithUsersAsync(string passcode);
    Task<bool> AddUserToResidenceAsync(ApplicationUser user, string passcode);
    Task<bool> RemoveUserFromResidenceAsync(int residenceId, string userId);
}