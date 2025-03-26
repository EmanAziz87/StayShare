using stayshare.Models;

namespace stayshare.Services.Interfaces;

public interface IChoreCompletionService
{
    Task<(ChoreCompletion choreCompletion, bool wasCreated)> GetChoreCompletionsByDateOrCreateAsync(int residentChoreId, string date);
    Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion);
}