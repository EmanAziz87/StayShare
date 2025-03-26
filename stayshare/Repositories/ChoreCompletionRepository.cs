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
            .Include(cc => cc.ResidentChores)
            .Where(cc => cc.ResidentChoresId == residentChoreId)
            .ToListAsync();
    }

    public async Task<ChoreCompletion> GetChoreCompletionsByDateAsync(string date)
    {
        // DO THIS****
    }

    public async Task<ChoreCompletion> CreateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        _context.ChoreCompletions.Add(choreCompletion);
        await _context.SaveChangesAsync();
        return choreCompletion;
    }

    public async Task<ChoreCompletion> UpdateChoreCompletionRecordAsync(ChoreCompletion choreCompletion)
    {
        _context.Entry(choreCompletion).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return choreCompletion;
    }
    
    
    
    
    
}