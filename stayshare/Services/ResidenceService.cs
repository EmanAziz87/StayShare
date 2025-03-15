using stayshare.Models;
using stayshare.Repositories.Interfaces;
using stayshare.Services.Interfaces;

namespace stayshare.Services;

public class ResidenceService : IResidenceService
{
    private readonly IResidenceRepository _residenceRepository;

    public ResidenceService(IResidenceRepository residenceRepository)
    {
        _residenceRepository = residenceRepository;
    }

    public async Task<IEnumerable<Residence>> GetAllResidencesAsync()
    {
        return await _residenceRepository.GetAllAsync();
    }

    public async Task<Residence> GetResidenceByIdAsync(int id)
    {
        return await _residenceRepository.GetByIdAsync(id);
    }

    public async Task<Residence> GetResidenceWithUsersAsync(string passcode)
    {
        return await _residenceRepository.GetResidenceWithUsersAsync(passcode);
    }

    public async Task<IEnumerable<Residence>> GetResidencesByAdminAsync(string adminId)
    {
        return await _residenceRepository.GetByAdminIdAsync(adminId);
    }

    public async Task<Residence> CreateResidenceAsync(Residence residence)
    {
        return await _residenceRepository.CreateAsync(residence);
    }

    public async Task<Residence> UpdateResidenceAsync(int id, Residence residence)
    {
        var existingResidence = await _residenceRepository.GetByIdAsync(id);
        if (existingResidence == null)
            return null;

        existingResidence.ResidenceName = residence.ResidenceName;
        
        return await _residenceRepository.UpdateAsync(existingResidence);
    }

    public async Task<bool> DeleteResidenceAsync(int id)
    {
        return await _residenceRepository.DeleteAsync(id);
    }

    public async Task<bool> AddUserToResidenceAsync(ApplicationUser user, string passcode)
    {

        if (user == null) return false;

        var residence = await _residenceRepository.GetResidenceWithUsersAsync(passcode);

        if (residence == null) return false;

        if (residence.Users.Any(u => u.Id == user.Id))
            return true; 
    
        residence.Users.Add(user);
        await _residenceRepository.UpdateAsync(residence);
        return true;
        
    }

    public async Task<bool> RemoveUserFromResidenceAsync(int residenceId, string userId)
    {
        var residence = await _residenceRepository.GetResidenceWithUsersAsync(userId);
        if (residence == null)
            return false;

        // This operation would typically be handled by a user repository
        // This is a simplification - in a real implementation, you'd set the user's ResidenceId to null
        // For now, we're just showing the concept

        return true;
    }
}