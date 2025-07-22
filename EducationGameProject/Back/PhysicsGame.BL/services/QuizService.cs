using System.Collections.Generic;
using System.Threading.Tasks;
using PhysicsGame.BL.Models;
using PhysicsGame.DAL.Context;
using PhysicsGame.DAL.Entities;

namespace PhysicsGame.BL.Services
{
    public class QuizService : IQuizService
    {
        private readonly PhysicsGameContext _context;

        public QuizService(PhysicsGameContext context)
        {
            _context = context;
        }

        public async Task AddQuizAsync(QuizData quizData)
        {
            switch (quizData.Type)
            {
                case Sciences.Thermodynamics:
                    var thermoEntities = new List<Thermodynamics>();
                    foreach (var q in quizData.Questions)
                    {
                        thermoEntities.Add(new Thermodynamics
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.Thermodynamics.AddRangeAsync(thermoEntities);
                    break;

                case Sciences.Electromagnetism:
                    var emEntities = new List<Electromagnetism>();
                    foreach (var q in quizData.Questions)
                    {
                        emEntities.Add(new Electromagnetism
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.Electromagnetism.AddRangeAsync(emEntities);
                    break;

                case Sciences.Mechanics:
                    var mechEntities = new List<Mechanics>();
                    foreach (var q in quizData.Questions)
                    {
                        mechEntities.Add(new Mechanics
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.Mechanics.AddRangeAsync(mechEntities);
                    break;

                case Sciences.ModernPhysics:
                    var mpEntities = new List<ModernPhysics>();
                    foreach (var q in quizData.Questions)
                    {
                        mpEntities.Add(new ModernPhysics
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.ModernPhysics.AddRangeAsync(mpEntities);
                    break;

                case Sciences.Optics:
                    var opticsEntities = new List<Optics>();
                    foreach (var q in quizData.Questions)
                    {
                        opticsEntities.Add(new Optics
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.Optics.AddRangeAsync(opticsEntities);
                    break;

                case Sciences.Relativity:
                    var relativityEntities = new List<Relativity>();
                    foreach (var q in quizData.Questions)
                    {
                        relativityEntities.Add(new Relativity
                        {
                            Identifier = q.Identifier,
                            QuestionEn = q.QuestionEn,
                            ResponseAEn = q.ResponseAEn,
                            ResponseBEn = q.ResponseBEn,
                            ResponseCEn = q.ResponseCEn,
                            RightResponseEn = q.RightResponseEn,
                            QuestionFr = q.QuestionFr,
                            ResponseAFr = q.ResponseAFr,
                            ResponseBFr = q.ResponseBFr,
                            ResponseCFr = q.ResponseCFr,
                            RightResponseFr = q.RightResponseFr,
                            Image = q.Image
                        });
                    }
                    await _context.Relativity.AddRangeAsync(relativityEntities);
                    break;

                default:
                    throw new System.Exception("Unsupported science type.");
            }

            await _context.SaveChangesAsync();
        }
    }

    public interface IQuizService
    {
        Task AddQuizAsync(QuizData quizData);
    }
}