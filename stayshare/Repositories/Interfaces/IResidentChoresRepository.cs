using stayshare.Models;

namespace stayshare.Repositories.Interfaces;

public interface IResidentChoresRepository
{
    Task<ResidentChores> GetResidentChoreAsync(string residentId, int choreId);
    Task<IEnumerable<ResidentChores>> GetByUserIdAsync(string residentId);
    Task<IEnumerable<ResidentChores>> GetByChoreIdAsync(int choreId);
    Task<ResidentChores> CreateAsync(ResidentChores residentChores);
    Task<ResidentChores> UpdateAsync(ResidentChores residentChores);
}