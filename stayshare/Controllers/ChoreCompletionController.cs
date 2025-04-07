using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using stayshare.Models;
using stayshare.Services;
using stayshare.Services.Interfaces;

namespace stayshare.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChoreCompletionController : ControllerBase
{
    private readonly IChoreCompletionService _choreCompletionService;

    public ChoreCompletionController(IChoreCompletionService choreCompletionService)
    {
        _choreCompletionService = choreCompletionService;
    }

    [HttpGet("{choreDate}")]
    public async Task<ActionResult<IEnumerable<ChoreCompletion>>> GetChoreCompletionsByDateAsync(string choreDate)
    {
        var choreCompletion = await _choreCompletionService.GetChoreCompletionsByDateAsync(choreDate);

        return StatusCode(200, choreCompletion);
    }

    [HttpGet("rejected/pending")]
    public async Task<ActionResult<IEnumerable<ChoreCompletion>>> GetAllChoreCompletionsRejectedOrPending()
    {
        var choreCompletions = await _choreCompletionService.GetAllChoreCompletionsRejectedOrPending();
        return StatusCode(200, choreCompletions);
    }

    [HttpPost]
    public async Task<ActionResult<ChoreCompletion>> CreateChoreCompletionRecordAsync([FromBody] ChoreCompletionCreateDto dto)
    {
        var newChoreCompletion = new ChoreCompletion
        {
            ResidentChoresId = dto.residentChoresId,
            SpecificAssignedDate = DateTime.Parse(dto.specificAssignedDate),
            Status = dto.status
        };

        var createdChoreCompletion = await _choreCompletionService.CreateChoreCompletionRecordAsync(newChoreCompletion);

        return StatusCode(201, createdChoreCompletion);
    }

    [HttpPut]
    public async Task<ActionResult<ChoreCompletion>> UpdateChoreCompletionRecordAsync(
        [FromBody] ChoreCompletionUpdateDto dto)
    {
        var existingChoreCompletion = await _choreCompletionService.GetChoreCompletionByIdAsync(dto.id);
        
        if (existingChoreCompletion == null)
        {
            return NotFound("ChoreCompletion not found");
        }

        if (dto.retired)
        {
            existingChoreCompletion.ResidentChores.User.TotalChoreCount += 1;
        }
        
        existingChoreCompletion.Status = dto.status;
        existingChoreCompletion.RejectionCount = dto.rejectionCount;
        existingChoreCompletion.Retired = dto.retired;

        await _choreCompletionService.UpdateChoreCompletionRecordAsync(existingChoreCompletion);
        return StatusCode(204);
    }
}

public class ChoreCompletionCreateDto
{
    public int residentChoresId { get; set; }
    public string specificAssignedDate { get; set; }
    public ChoreCompletionStatus status { get; set; }
}

public class ChoreCompletionUpdateDto
{
    public int id { get; set; }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ChoreCompletionStatus status { get; set; }
    public bool retired { get; set; } = false;
    public int rejectionCount { get; set; }
}