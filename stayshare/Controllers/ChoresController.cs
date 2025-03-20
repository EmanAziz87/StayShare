using Microsoft.AspNetCore.Mvc;
using stayshare.Models;
using stayshare.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.JSInterop.Infrastructure;

namespace stayshare.Controllers
{
    [Authorize]
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
        public async Task<ActionResult<Chore>> CreateChore([FromBody] ChoreCreateDto dto)
        {
            var chore = new Chore
            {
                TaskName = dto.taskName,
                IntervalDays = dto.intervalDays,
                ResidenceId = dto.residenceId
            };
            
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

public class ChoreCreateDto
{
    public string taskName { get; set; }
    public int intervalDays { get; set; }
    public int residenceId { get; set; }
}

