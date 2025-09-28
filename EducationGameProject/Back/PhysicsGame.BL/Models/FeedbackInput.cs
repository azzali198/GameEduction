using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhysicsGame.BL.Models
{
    public class FeedbackInput
    {
        public string Login { get; set; }
        public string FeedbackText { get; set; }
        public string Email { get; set; }
        public DateTime Date { get; set; }
    }
}