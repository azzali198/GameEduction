using PhysicsGame.DAL.Entities;

namespace PhysicsGame.BL.Models
{
    public class LoginResponse
    {
        public User User { get; set; }
        public string Token { get; set; }
        public bool IsAdmin { get; set; } 

        public LoginResponse(User user, string token, bool isAdmin)
        {
            User = user;
            Token = token;
            IsAdmin = isAdmin;
        }
    }
}