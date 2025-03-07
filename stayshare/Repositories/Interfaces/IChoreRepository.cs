using stayshare.Models;

namespace stayshare.Repositories.Interfaces;

public interface IChoreRepository
{
    Task<IEnumerable<Chore>> GetAllAsync();
    Task<Chore> GetByIdAsync(int id);
    Task<Chore> CreateAsync(Chore chore);
    Task<Chore> UpdateAsync(Chore chore);
    Task<bool> DeleteAsync(int id);

}