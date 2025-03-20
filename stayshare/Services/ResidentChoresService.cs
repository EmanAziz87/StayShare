using System.Collections;
using stayshare.Models;
using stayshare.Repositories.Interfaces;
using stayshare.Services.Interfaces;

namespace stayshare.Services;

public class ResidentChoresService : IResidentChoresService
{
    private readonly IResidentChoresRepository _residentChoresRepository;

    public ResidentChoresService(IResidentChoresRepository residentChoresRepository)
    {
        _residentChoresRepository = residentChoresRepository;
    }
    
    public async Task<ResidentChoresDto> GetChoresByUserIdAsync(string residentId)
    {
        var choreResponse = await _residentChoresRepository.GetByUserIdAsync(residentId);

        var transformedData = new ResidentChoresDto
        {
            ResidentId = residentId,
            Chores = choreResponse.Select(rc => new ChoresDto
            {
                ChoreId = rc.ChoreId,
                TaskName = rc.Chore.TaskName,
                IntervalDays = rc.Chore.IntervalDays,
                AssignedDate = rc.AssignedDate,
                CompletionCount = rc.CompletionCount
            })
        };
        
        return transformedData;
    }

    public async Task<IEnumerable<ResidentChores>> GetUsersByChoreIdAsync(int choreId)
    {
        return await _residentChoresRepository.GetByChoreIdAsync(choreId);
    }

    public async Task<ResidentChores> CreateResidentChoreAsync(ResidentChores residentChore)
    {
        return await _residentChoresRepository.CreateAsync(residentChore);
    }

    public async Task<ResidentChores> UpdateResidentChoreAsync(ResidentChores residentChores)
    {
        return await _residentChoresRepository.UpdateAsync(residentChores);
    }
}

public class ResidentChoresDto
{
    public string ResidentId { get; set; }
    public IEnumerable<ChoresDto> Chores {get; set; }
}

public class ChoresDto
{
    public int ChoreId { get; set; }
    public string TaskName { get; set; }
    public int IntervalDays { get; set; }
    public DateTime AssignedDate { get; set; }
    public int CompletionCount { get; set; }
    
}