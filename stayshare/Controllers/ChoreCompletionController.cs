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

    [HttpGet("{residentChoreId}/{choreDate}")]
    public async Task<ActionResult<ChoreCompletion>> GetChoreCompletionsByDateOrCreateAsync(int residentChoreId, string choreDate)
    {
        var (choreCompletion, wasCreated) = await _choreCompletionService.GetChoreCompletionsByDateOrCreateAsync(residentChoreId, choreDate);

        if (wasCreated)
        {
            return StatusCode(201, choreCompletion);
        }

        return Ok(choreCompletion);
    }
}