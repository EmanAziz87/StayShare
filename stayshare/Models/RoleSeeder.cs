using Microsoft.AspNetCore.Identity;

namespace stayshare.Models;

public class RoleSeeder
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleSeeder(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task SeedRolesAsync()
    {
        string[] roleNames = { "Admin", "User" };
        foreach (var roleName in roleNames)
        {
            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        
    }
}
