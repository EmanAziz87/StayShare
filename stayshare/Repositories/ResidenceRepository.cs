using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories.Interfaces;

namespace stayshare.Repositories;

public class ResidenceRepository : IResidenceRepository
{
    private readonly ApplicationDbContext _context;

    public ResidenceRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Residence>> GetAllAsync()
    {
        return await _context.Residences
            .Include(r => r.Users)
            .ToListAsync();
    }

    public async Task<Residence> GetByIdAsync(int id)
    {
        return await _context.Residences
            .Include(r => r.Users)
            .Include(r => r.Chores)
            .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Residence> GetResidenceWithUsersAsync(string passcode)
    {
        return await _context.Residences
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Passcode == passcode);
    }

    public async Task<IEnumerable<Residence>> GetByAdminIdAsync(string adminId)
    {
        return await _context.Residences
            .Where(r => r.AdminId == adminId)
            .ToListAsync();
    }

    public async Task<Residence> CreateAsync(Residence residence)
    {
        _context.Residences.Add(residence);
        await _context.SaveChangesAsync();
        return residence;
    }
    
    public async Task<Residence> AddUserToResidenceAsync(ApplicationUser user, string passcode)
    {
        var residence = await _context.Residences
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Passcode == passcode);

        if (residence != null)
        {
            residence.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        return residence;
    }

    public async Task<Residence> UpdateAsync(Residence residence)
    {
        _context.Entry(residence).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return residence;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var residence = await _context.Residences.FindAsync(id);
        if (residence == null)
            return false;

        _context.Residences.Remove(residence);
        await _context.SaveChangesAsync();
        return true;
    }
}