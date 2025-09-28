using System;

namespace PhysicsGame.DAL.Entities
{
    public class User
    {
        public int IdUser { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string Country { get; set; }
        
        public string UserName { get; set; }
        
        public DateOnly DateOfBirth { get; set; }  // Changed to DateOnly which represents just a date
        
        public string Profession { get; set; }
        
        public bool Actif { get; set; } // <-- Add this line
    }
}