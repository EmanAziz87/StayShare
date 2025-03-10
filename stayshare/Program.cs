using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories;
using stayshare.Repositories.Interfaces;
using stayshare.Services;
using stayshare.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ALL services should be registered BEFORE building the application
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IChoreRepository, ChoreRepository>();
builder.Services.AddScoped<IChoreService, ChoreService>();

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(optionsBuilder =>
{
    optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => { })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
});

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Your React app URL
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseCors("AllowReactApp");


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
app.UseAuthorization();

app.MapFallbackToFile("index.html");
app.MapStaticAssets();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

await DatabaseConnectionTester.TestConnection(app.Services);

app.Run();