using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stayshare.Models;
using stayshare.Services;
using stayshare.Services.Interfaces;

namespace stayshare.Controllers;

[Authorize]
[Route("/api/[controller]")]
[ApiController]
public class ResidentChoresController : ControllerBase
{
    private readonly IResidentChoresService _residentChoresService;

    public ResidentChoresController(IResidentChoresService residentChoresService)
    {
        _residentChoresService = residentChoresService;
    }

    [HttpGet("{residentId}/{choreId}")]
    public async Task<ActionResult<ResidentChores>> GetResidentChoreAsync(string residentId, int choreId)
    {
        var residentChore = await _residentChoresService.GetResidentChoreAsync(residentId, choreId);
        return StatusCode(200, residentChore);
    }

    [HttpGet("chores/{residentId}")]
    public async Task<ActionResult<ResidentChoresDto>> GetAllChoresForAUserAsync(string residentId)
    {
        var allChoresByUser = await _residentChoresService.GetChoresByUserIdAsync(residentId);
        return Ok(allChoresByUser);
    }

    [HttpGet("residents/{choreId}")]
    public async Task<ActionResult<IEnumerable<ResidentChores>>> GetAllUsersForAChore(int choreId)
    {
        var allUsersByChore = await _residentChoresService.GetUsersByChoreIdAsync(choreId);
        return Ok(allUsersByChore);
    }

    [HttpPost]
    public async Task<ActionResult<ResidentChores>> CreateResidentChore([FromBody] ResidenceChoresCreateDto dto)
    {
        var residentChore = new ResidentChores
        {
            ResidentId = dto.residentId,
            ChoreId = dto.choreId
        };
        
        var createdResidentChore = await _residentChoresService.CreateResidentChoreAsync(residentChore);
        return StatusCode(201, createdResidentChore);
    }

    [HttpPut("updateCount")]
    public async Task<ActionResult<ResidentChores>> UpdateResidentChoreCompletionCountAsync([FromBody] ResidentChoresUpdateCountDto updatedCountDto)
    {
        var newResidentChore = new ResidentChores
        {
            Id = updatedCountDto.residentChoresId,
            CompletionCount = updatedCountDto.completionCount
        };

        var updatedChore = await _residentChoresService.UpdateResidentChoreAsync(newResidentChore);
        return StatusCode(204);
    }
}

public class ResidenceChoresCreateDto {
    public string residentId { get; set; }
    public int choreId { get; set; }
}

public class ResidentChoresUpdateCountDto
{
    public int completionCount { get; set; }
    public int residentChoresId { get; set; }
}

