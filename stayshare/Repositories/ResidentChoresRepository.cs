using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories.Interfaces;

namespace stayshare.Repositories;

public class ResidentChoresRepository : IResidentChoresRepository
{
    private readonly ApplicationDbContext _context;

    public ResidentChoresRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ResidentChores> GetResidentChoreAsync(string residentId, int choreId)
    {
        return await _context.ResidentChores
            .Where(rc => rc.ResidentId == residentId && rc.ChoreId == choreId)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<ResidentChores>> GetByUserIdAsync(string residentId)
    {
        return await _context.ResidentChores
            .Include(rc => rc.Chore)
            .Where(rc => rc.ResidentId == residentId)
            .ToListAsync();
    }

    public async Task<IEnumerable<ResidentChores>> GetByChoreIdAsync(int choreId)
    {
        return await _context.ResidentChores
            .Include(rc => rc.User)
            .Where(rc => rc.ChoreId == choreId)
            .ToListAsync();
    }

    public async Task<ResidentChores> CreateAsync(ResidentChores residentChores)
    {
        _context.ResidentChores.Add(residentChores);
        await _context.SaveChangesAsync();
        return residentChores;
    }

    public async Task<ResidentChores> UpdateAsync(ResidentChores residentChores)
    {
        _context.ResidentChores.Update(residentChores);
        await _context.SaveChangesAsync();
        return residentChores;
    }
    
}