using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhysicsGame.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using PhysicsGame.DAL.Context;
using BCrypt.Net;

namespace PhysicsGame.BL.services
{
    public class UserService : IUserService
    {
        private readonly PhysicsGameContext _context;

        public UserService(PhysicsGameContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        private bool IsPasswordValid(string password)
        {
            if (password.Length < 8)
                return false;

            // Check for at least one uppercase letter
            if (!password.Any(char.IsUpper))
                return false;

            // Check for at least one number
            if (!password.Any(char.IsDigit))
                return false;

            // Check for at least one special character
            var specialCharacters = @"!@#$%^&*()_+-=[]{}|;:,.<>?";
            if (!password.Any(c => specialCharacters.Contains(c)))
                return false;

            return true;
        }

        private bool IsEmailValid(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt());
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UserExists(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return false;
            
            return VerifyPassword(password, user.Password);
        }

        public async Task SubscribeUser(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (string.IsNullOrWhiteSpace(user.Email))
                throw new ArgumentException("Email is required", nameof(user.Email));
            
            if (!IsEmailValid(user.Email))
                throw new ArgumentException("Invalid email format", nameof(user.Email));

            if (string.IsNullOrWhiteSpace(user.Password))
                throw new ArgumentException("Password is required", nameof(user.Password));
                
            if (!IsPasswordValid(user.Password))
                throw new ArgumentException("Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character", nameof(user.Password));
                
            if (string.IsNullOrWhiteSpace(user.Country))
                throw new ArgumentException("Country is required", nameof(user.Country));
                
            if (string.IsNullOrWhiteSpace(user.UserName))
                throw new ArgumentException("Username is required", nameof(user.UserName));
                
            if (string.IsNullOrWhiteSpace(user.Profession)) 
                throw new ArgumentException("Profession is required", nameof(user.Profession));
                
            if (user.DateOfBirth == default)
                throw new ArgumentException("Date of birth is required", nameof(user.DateOfBirth));

            if (await UserExists(user.Email, user.Password))
            {
                throw new InvalidOperationException("A user with this email already exists");
            }

            // Hash the password before saving
            user.Password = HashPassword(user.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public Task<User> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task SusbcribeUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}