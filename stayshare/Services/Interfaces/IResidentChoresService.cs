using stayshare.Models;

namespace stayshare.Services.Interfaces;

public interface IResidentChoresService
{
    Task<ResidentChoresDto> GetChoresByUserIdAsync(string residentId);
    Task<IEnumerable<ResidentChores>> GetUsersByChoreIdAsync(int choreId);
    Task<ResidentChores> CreateResidentChoreAsync(ResidentChores residentChores);
    Task<ResidentChores> UpdateResidentChoreAsync(ResidentChores residentChores);
}