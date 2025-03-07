// ChoreService.cs

using stayshare.Models;
using stayshare.Repositories.Interfaces;
using stayshare.Services.Interfaces;

namespace stayshare.Services
{
    public class ChoreService : IChoreService
    {
        private readonly IChoreRepository _choreRepository;

        public ChoreService(IChoreRepository choreRepository)
        {
            _choreRepository = choreRepository;
        }

        public async Task<IEnumerable<Chore>> GetAllChoresAsync()
        {
            return await _choreRepository.GetAllAsync();
        }

        public async Task<Chore> GetChoreByIdAsync(int id)
        {
            return await _choreRepository.GetByIdAsync(id);
        }

        public async Task<Chore> CreateChoreAsync(Chore chore)
        {
            return await _choreRepository.CreateAsync(chore);
        }

        public async Task<Chore> UpdateChoreAsync(Chore chore)
        {
            return await _choreRepository.UpdateAsync(chore);
        }

        public async Task<bool> DeleteChoreAsync(int id)
        {
            return await _choreRepository.DeleteAsync(id);
        }
    }
}