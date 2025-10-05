using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PhysicsGame.BL.Models;
using PhysicsGame.DAL.Entities;

namespace PhysicsGame.BL
{
    public interface IUserService
    {
        Task SubscribeUser(User user);
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserByUserNameAsync(string userName);
        Task<IEnumerable<User>> GetAllUsers();
        Task<bool> DeleteUser(int id);
        Task<User> UpdateUserAsync(User userInput);
        Task<LoginResponse> LoginUser(string username, string password);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task ActivateUserAsync(string userId);
        Task DeactivateUserAsync(string userId);
        Task DeleteUserAsync(string userId);
    }
}