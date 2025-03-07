namespace stayshare.Models;

public static class DatabaseConnectionTester
{
    public static async Task TestConnection(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        try
        {
            // Test basic connection
            var canConnect = await dbContext.Database.CanConnectAsync();
            Console.WriteLine($"Basic connection test: {(canConnect ? "Successful" : "Failed")}");

            // Test if database exists
            var exists = await dbContext.Database.EnsureCreatedAsync();
            Console.WriteLine($"Database exists: {exists}");

            // Get database provider info
            var provider = dbContext.Database.ProviderName;
            Console.WriteLine($"Database provider: {provider}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Connection test failed: {ex.Message}");
            throw;
        }
    }
}

