namespace PhysicsGame.BL.Models
{
    public class QuestionModel
    {
        public int Id { get; set; }
        public int Identifier { get; set; }

        // English
        public string QuestionEn { get; set; }
        public string ResponseAEn { get; set; }
        public string ResponseBEn { get; set; }
        public string ResponseCEn { get; set; }
        public string RightResponseEn { get; set; }

        // French
        public string QuestionFr { get; set; }
        public string ResponseAFr { get; set; }
        public string ResponseBFr { get; set; }
        public string ResponseCFr { get; set; }
        public string RightResponseFr { get; set; }

        // Optional image path or URL
        public string Image { get; set; }
    }
}