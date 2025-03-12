
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using stayshare.Models;

namespace stayshare.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _signInManager.PasswordSignInAsync(
            model.Email,
            model.Password,
            model.RememberMe,
            lockoutOnFailure: true);
        
        var user = await _userManager.FindByEmailAsync(model.Email);
        var roles = await _userManager.GetRolesAsync(user);

        if (result.Succeeded)
        {
            return Ok(new {message = "Login successful", succeeded = true, userName = model.Email, roles});
        }

        return Unauthorized(new { message = "Invalid login attempt" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
            
            if (model.isAdmin)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            
            return Ok(new { message = "Registration successful"});
        }

        return BadRequest(new { errors = result.Errors });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(new { message = "Logged out successfully" });
    }
    
    [Authorize]
    [HttpGet("validate")]
    public IActionResult ValidateSession()
    {
        // If we reach here, the cookie is valid
        return Ok(new { isValid = true });
    }

}

// DTOs (Data Transfer Objects) to replace the ViewModels
public class LoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
    
}

public class RegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    
    public bool isAdmin { get; set; }

}