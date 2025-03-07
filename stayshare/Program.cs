using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories;
using stayshare.Repositories.Interfaces;
using stayshare.Services;
using stayshare.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddScoped<IChoreRepository, ChoreRepository>();
builder.Services.AddScoped<IChoreService, ChoreService>();
builder.Services.AddDbContext<ApplicationDbContext>(optionsBuilder =>
{
    optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});




// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthorization();

app.MapFallbackToFile("index.html");

app.MapStaticAssets();

app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

await DatabaseConnectionTester.TestConnection(app.Services);


app.Run();