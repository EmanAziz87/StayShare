using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories;
using stayshare.Repositories.Interfaces;
using stayshare.Services;
using stayshare.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ALL services should be registered BEFORE building the application
builder.Services.AddControllersWithViews(); // Move this up before app.Build()
builder.Services.AddScoped<IChoreRepository, ChoreRepository>();
builder.Services.AddScoped<IChoreService, ChoreService>();

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(optionsBuilder =>
{
    optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// Identity configuration
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
    {
        // Your identity options...
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Cookie configuration
builder.Services.ConfigureApplicationCookie(options =>
{
    // Your cookie options...
});

// Add Authorization services
builder.Services.AddAuthorization(); // Add this line

var app = builder.Build();

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Authentication and Authorization middleware in correct order
app.UseAuthentication();
app.UseAuthorization(); // Only one instance of this

app.MapFallbackToFile("index.html");
app.MapStaticAssets();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

await DatabaseConnectionTester.TestConnection(app.Services);

app.Run();