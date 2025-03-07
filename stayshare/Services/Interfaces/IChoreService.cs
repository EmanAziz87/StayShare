using stayshare.Models;

namespace stayshare.Services.Interfaces;

public interface IChoreService
{
    Task<IEnumerable<Chore>> GetAllChoresAsync();
    Task<Chore> GetChoreByIdAsync(int id);
    Task<Chore> CreateChoreAsync(Chore chore);
    Task<Chore> UpdateChoreAsync(Chore chore);
    Task<bool> DeleteChoreAsync(int id);

}