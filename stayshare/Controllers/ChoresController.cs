// ChoresController.cs

using Microsoft.AspNetCore.Mvc;
using stayshare.Models;
using stayshare.Services.Interfaces;
using System.Threading.Tasks;

namespace stayshare.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChoresController : ControllerBase
    {
        private readonly IChoreService _choreService;

        public ChoresController(IChoreService choreService)
        {
            _choreService = choreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chore>>> GetChores()
        {
            var chores = await _choreService.GetAllChoresAsync();
            return Ok(chores);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chore>> GetChore(int id)
        {
            var chore = await _choreService.GetChoreByIdAsync(id);

            if (chore == null)
            {
                return NotFound();
            }

            return Ok(chore);
        }

        [HttpPost]
        public async Task<ActionResult<Chore>> CreateChore(Chore chore)
        {
            var createdChore = await _choreService.CreateChoreAsync(chore);
            return CreatedAtAction(nameof(GetChore), new { id = createdChore.Id }, createdChore);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateChore(int id, Chore chore)
        {
            if (id != chore.Id)
            {
                return BadRequest();
            }

            var updatedChore = await _choreService.UpdateChoreAsync(chore);

            if (updatedChore == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChore(int id)
        {
            var result = await _choreService.DeleteChoreAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}