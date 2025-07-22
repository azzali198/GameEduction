using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhysicsGame.BL.Models
{
    public class QuizData
    {
        public List<QuestionModel> Questions { get; set; }
        public Sciences Type { get; set; } // e.g., "physics", "thermodynamics", etc.
    }
}