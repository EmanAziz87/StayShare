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

    [HttpGet("chores/{residentId}")]
    public async Task<ActionResult<ResidentChoresDto>> GetAllChoresForAUser(string residentId)
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
}

public class ResidenceChoresCreateDto {
    public string residentId { get; set; }
    public int choreId { get; set; }
}