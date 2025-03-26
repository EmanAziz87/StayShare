using stayshare.Models;

namespace stayshare.Repositories.Interfaces;

public interface IChoreCompletionRepository
{
    Task<IEnumerable<ChoreCompletion>> GetChoreCompletionsByResidentChoresIdAsync (int residentChoreId);
    Task<ChoreCompletion?> GetChoreCompletionByDateAsync(int residentChoreId, string date);
    Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
    Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
}