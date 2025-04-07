using stayshare.Models;

namespace stayshare.Services.Interfaces;

public interface IChoreCompletionService
{
    Task<ChoreCompletion> GetChoreCompletionByIdAsync(int id);
    Task<IEnumerable<ChoreCompletion>> GetAllChoreCompletionsRejectedOrPending();
    Task<IEnumerable<ChoreCompletion>> GetChoreCompletionsByDateAsync(string date);
    Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
    Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
}