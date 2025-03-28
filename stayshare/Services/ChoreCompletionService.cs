using stayshare.Models;
using stayshare.Repositories;
using stayshare.Repositories.Interfaces;
using stayshare.Services.Interfaces;

namespace stayshare.Services;

public class ChoreCompletionService : IChoreCompletionService
{
    private readonly IChoreCompletionRepository _choreCompletionRepository;

    public ChoreCompletionService(IChoreCompletionRepository choreCompletionRepository)
    {
        _choreCompletionRepository = choreCompletionRepository;
    }

    public async Task<(ChoreCompletion choreCompletion, bool wasCreated)> GetChoreCompletionsByDateOrCreateAsync(int residentChoreId, string date)
    {
        Console.WriteLine("*****************:" + residentChoreId);
        var response = await _choreCompletionRepository.GetChoreCompletionByDateAsync(residentChoreId, date);
        if (response == null)
        {
            var newChoreCompletion = new ChoreCompletion
            {
                ResidentChoresId = residentChoreId,
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