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

    public async Task<ChoreCompletion> GetChoreCompletionByIdAsync(int id)
    {
        return await _choreCompletionRepository.GetChoreCompletionByIdAsync(id);
    }

    public async Task<IEnumerable<ChoreCompletion>> GetAllChoreCompletionsRejectedOrPending()
    {
        return await _choreCompletionRepository.GetAllChoreCompletionsRejectedOrPending();
    }



    public async Task<IEnumerable<ChoreCompletion>> GetChoreCompletionsByDateAsync(string date)
    {
        return await _choreCompletionRepository.GetChoreCompletionByDateAsync(date);
        
    }

    public async Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        return await _choreCompletionRepository.UpdateChoreCompletionRecordAsync(choreCompletion);
    }

    public async Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        return await _choreCompletionRepository.CreateChoreCompletionRecordAsync(choreCompletion);
    }

}