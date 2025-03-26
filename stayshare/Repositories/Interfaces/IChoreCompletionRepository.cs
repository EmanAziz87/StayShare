using stayshare.Models;

namespace stayshare.Repositories.Interfaces;

public interface IChoreCompletionRepository
{
    Task<IEnumerable<ChoreCompletion>> GetChoreCompletionsByResidentChoresIdAsync (int residentChoreId);
    Task<ChoreCompletion> GetChoreCompletionsByDateAsync(string date);
    Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
    Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
}