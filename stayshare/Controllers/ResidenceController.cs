using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using stayshare.Models;
using stayshare.Services.Interfaces;

namespace stayshare.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ResidencesController : ControllerBase
{
    private readonly IResidenceService _residenceService;
    private readonly UserManager<ApplicationUser> _userManager;
    
    public ResidencesController(IResidenceService residenceService, UserManager<ApplicationUser> userManager)
    {
        _residenceService = residenceService;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Residence>>> GetResidences()
    {
        var residences = await _residenceService.GetAllResidencesAsync();
        return Ok(residences);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Residence>> GetResidence(int id)
    {
        var residence = await _residenceService.GetResidenceByIdAsync(id);

        if (residence == null)
        {
            return NotFound();
        }

        return Ok(residence);
    }

    [HttpGet("{id}/users")]
    public async Task<ActionResult<Residence>> GetResidenceWithUsers(string passcode)
    {
        var residence = await _residenceService.GetResidenceWithUsersAsync(passcode);

        if (residence == null)
        {
            return NotFound();
        }

        return Ok(residence);
    }

    [HttpGet("admin/{adminId}")]
    public async Task<ActionResult<IEnumerable<Residence>>> GetResidencesByAdmin(string adminId)
    {
        var residences = await _residenceService.GetResidencesByAdminAsync(adminId);
        return Ok(residences);
    }

    [HttpPost]
    public async Task<ActionResult<Residence>> CreateResidence([FromBody] ResidenceCreateDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.adminEmail);
        
        if (user == null)
        {
            return NotFound("Admin user not found");
        }
        
        // Need to convert dto to Residence, as our database model is Residence, and not ResidenceCreateDto.
        // ResidenceCreateDto is used to validate the input data from the frontend.
        var residence = new Residence
        {
            ResidenceName = dto.residenceName,
            AdminId = user.Id,
            Passcode = dto.passcode
        };
        
        var createdResidence = await _residenceService.CreateResidenceAsync(residence);
        
        // result anonymous object is used to control which values of our created residence is
        // returned to the client. We don't want to return the whole object, as it may contain sensitive data.
        var result = new 
        {
            createdResidence.Id,
            createdResidence.ResidenceName,
            createdResidence.AdminId,
            AdminEmail = user.Email
        };
        
        // nameOfResidence - controller method that returns the newely created residence.
        // nameof will remove "Get" from GetResidences and use that in the route path for GetResidences.
        // new { id = createdResidence.Id } - will be used alongside our extracted "Residences" in our
        // url path, like so api/residences/{id}. and lastly, result is the data we choose to send back
        // to the client in our response body.
        return CreatedAtAction(nameof(GetResidence), new { id = createdResidence.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateResidence(int id, Residence residence)
    {
        var updatedResidence = await _residenceService.UpdateResidenceAsync(id, residence);

        if (updatedResidence == null)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResidence(int id)
    {
        var result = await _residenceService.DeleteResidenceAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPost("users/{userName}")]
    public async Task<IActionResult> AddUserToResidence([FromBody] ResidenceAddUserDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.userName);

        var result = await _residenceService.AddUserToResidenceAsync(user, dto.passcode);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{residenceId}/users/{userId}")]
    public async Task<IActionResult> RemoveUserFromResidence(int residenceId, string userId)
    {
        var result = await _residenceService.RemoveUserFromResidenceAsync(residenceId, userId);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}

public class ResidenceCreateDto
{
    public string residenceName { get; set; }
    public string adminEmail { get; set; }
    
    public string passcode { get; set; }
}

public class ResidenceAddUserDto
{
    public string userName { get; set; }
    public string passcode { get; set; }
}