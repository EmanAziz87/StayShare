using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using stayshare.Models;
using stayshare.Repositories;
using stayshare.Repositories.Interfaces;
using stayshare.Services;
using stayshare.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<IChoreRepository, ChoreRepository>();
builder.Services.AddScoped<IChoreService, ChoreService>();
builder.Services.AddScoped<IResidenceRepository, ResidenceRepository>();
builder.Services.AddScoped<IResidenceService, ResidenceService>();
builder.Services.AddScoped<IResidentChoresRepository, ResidentChoresRepository>();
builder.Services.AddScoped<IResidentChoresService, ResidentChoresService>();



var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(optionsBuilder =>
{
    optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});


builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options => { })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddScoped<RoleSeeder>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// using keyword is simply specified to dispose of the block after the block is executed
// this code creates a scope for our application
// we then use this scope to get the services we need, in this case RoleSeeder
// then we call the SeedRolesAsync method to seed the roles: Admin and User in our database.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var roleSeeder = services.GetRequiredService<RoleSeeder>();
    await roleSeeder.SeedRolesAsync();
}

// this is where we specify the CORS policy we created above
app.UseCors("AllowReactApp");

// tells the app to only use https instead of http during production. 
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}


// automatically redirects http requests to https by adding a 307 Temporary Redirect response to the
// same request with the https scheme instead.
app.UseHttpsRedirection();

// allows serving static files from the wwwroot folder
app.UseStaticFiles();

// Base for routing requests to controllers and their actions.
app.UseRouting();

// authentication middleware that extracts identity information from the request (cookies, jwt, etc.)
// Http.Context.User is set to the authenticated user.
app.UseAuthentication();

// Once authenticated, can use [Authorize] attribute to restrict access to certain controllers or actions
// as well as admin or user specific actions.
app.UseAuthorization();

// For browser-to-server http request that aren't defined in my backend.
// This allows it to serve the index.html file from the wwwroot folder.
// this is for production, when both frontend and backend are running on one server.
app.MapFallbackToFile("index.html");

/*
app.MapStaticAssets();
*/

// We specify our route structure for our controllers. {controller} will be replaced with the name of the class 
// without the "Controller" suffix, and {action} will be replaced with the name of the method in the controller.
// id is an optional parameter that can be used to specify the id of the resource we want to access.
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action}/{id?}");
    /*
    .WithStaticAssets();
    */

await DatabaseConnectionTester.TestConnection(app.Services);

app.Run();