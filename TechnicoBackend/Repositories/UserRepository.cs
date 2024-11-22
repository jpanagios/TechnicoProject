using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Data;
using TechnicoBackend.Interfaces;
using TechnicoBackend.Models;

namespace TechnicoBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TechnicoDbContext _context;

        public UserRepository(TechnicoDbContext context)
        {
            _context = context;
        }

        public async Task<User?> ValidateCredentialsAsync(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }
}
