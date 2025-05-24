namespace PhysicsGame.DAL.Entities
{
    public class Feedbacks
    {
        public int Id { get; set; }
        
        public string Login { get; set; }
        
        public string Email { get; set; }
        
        public string FeedbackText { get; set; }
        
        public DateTime Date { get; set; }
    }
}