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
        Task<IEnumerable<User>> GetAllUsers();
        Task<bool> DeleteUser(int id);
        Task<User> UpdateUser(User user);
        Task<LoginResponse> LoginUser(string username, string password);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }
}