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

    [HttpPost]
    public async Task<ActionResult<ChoreCompletion>> CreateChoreCompletionRecordAsync([FromBody] ChoreCompletionCreateDto dto)
    {
        var newChoreCompletion = new ChoreCompletion
        {
            ResidentChoresId = dto.residentChoresId,
            SpecificAssignedDate = DateTime.Parse(dto.specificAssignedDate)
        };

        var createdChoreCompletion = await _choreCompletionService.CreateChoreCompletionRecordAsync(newChoreCompletion);

        return StatusCode(201, createdChoreCompletion);
    }
}

public class ChoreCompletionCreateDto
{
    public int residentChoresId { get; set; }
    public string specificAssignedDate { get; set; }
}