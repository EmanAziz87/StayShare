using stayshare.Models;
using stayshare.Repositories;
using stayshare.Services.Interfaces;

namespace stayshare.Services;

public class ChoreCompletionService : IChoreCompletionService
{
    private readonly ChoreCompletionRepository _choreCompletionRepository;

    public ChoreCompletionService(ChoreCompletionRepository choreCompletionRepository)
    {
        _choreCompletionRepository = choreCompletionRepository;
    }

    public async Task<(ChoreCompletion choreCompletion, bool wasCreated)> GetChoreCompletionsByDateOrCreateAsync(int residentChoreId, string date)
    {
        var response = await _choreCompletionRepository.GetChoreCompletionByDateAsync(residentChoreId, date);

        if (response == null)
        {
            var newChoreCompletion = new ChoreCompletion
            {
                SpecificAssignedDate = DateTime.Parse(date),
                Completed = false
            };

            var choreCreated = await _choreCompletionRepository.CreateChoreCompletionRecordAsync(newChoreCompletion);
            return (choreCreated, true);
        }

        return (response, false);
    }

    public async Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        return await _choreCompletionRepository.UpdateChoreCompletionRecordAsync(choreCompletion);
    }

}