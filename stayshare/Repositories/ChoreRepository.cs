
using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories.Interfaces;

namespace stayshare.Repositories
{
    public class ChoreRepository : IChoreRepository
    {
        private readonly ApplicationDbContext _context;

        public ChoreRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Chore>> GetAllAsync()
        {
            return await _context.Chores.ToListAsync();
        }

        public async Task<Chore> GetByIdAsync(int id)
        {
            return await _context.Chores.FindAsync(id);
        }

        public async Task<Chore> CreateAsync(Chore chore)
        {
            await _context.Chores.AddAsync(chore);
            await _context.SaveChangesAsync();
            return chore;
        }

        public async Task<Chore> UpdateAsync(Chore chore)
        {
            _context.Chores.Update(chore);
            await _context.SaveChangesAsync();
            return chore;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var chore = await GetByIdAsync(id);
            if (chore == null)
                return false;

            _context.Chores.Remove(chore);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}