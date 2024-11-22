using TechnicoBackend.Models;

namespace TechnicoBackend.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> ValidateCredentialsAsync(string email, string password);
        Task<bool> UserExistsAsync(string email);
        Task AddUserAsync(User user);
    }
}
