using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories.Interfaces;

namespace stayshare.Repositories;

public class ChoreCompletionRepository : IChoreCompletionRepository
{
    private readonly ApplicationDbContext _context;

    public ChoreCompletionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ChoreCompletion>> GetChoreCompletionsByResidentChoresIdAsync(int residentChoreId)
    {
        return await _context.ChoreCompletions
            .Where(cc => cc.ResidentChoresId == residentChoreId)
            .ToListAsync();
    }

    public async Task<ChoreCompletion?> GetChoreCompletionByDateAsync(int residentChoreId, string date)
    {
        DateTime parsedDate = DateTime.Parse(date);
        
        return await _context.ChoreCompletions
            .Where(cc => cc.ResidentChoresId == residentChoreId &&
                         cc.SpecificAssignedDate.Date == parsedDate.Date)
            .FirstOrDefaultAsync();

    }

    public async Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        _context.ChoreCompletions.Add(choreCompletion);
        await _context.SaveChangesAsync();
        return choreCompletion;
    }

    public async Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        _context.Update(choreCompletion);
        await _context.SaveChangesAsync();
        return choreCompletion;
    }
    
    
    
    
    
}