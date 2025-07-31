using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using PhysicsGame.BL.Models;
using System.Text.Json;
using PhysicsGame.DAL.Context;
using PhysicsGame.DAL.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PhysicsGame.BL.Services
{
    public interface IXmlImportService
    {
        Task<List<QuestionModel>> ValidateAndParseXmlAsync(string xmlString, string xsdString, string topic);
        Task<List<QuestionModel>> DeleteQuestionAsync(string topic, int identifier);
    }

    public class XmlImportService : IXmlImportService
    {
        private readonly PhysicsGameContext _context;

        public XmlImportService(PhysicsGameContext context)
        {
            _context = context;
        }

        public async Task<List<QuestionModel>> ValidateAndParseXmlAsync(string xmlString, string xsdString, string topic)
        {
            // Prepare schema set
            var schemas = new XmlSchemaSet();
            using (var xsdReader = new StringReader(xsdString))
            {
                schemas.Add(null, XmlReader.Create(xsdReader));
            }
         // string xmlContent = JsonSerializer.Deserialize<string>(xmlString);
            XDocument doc = XDocument.Parse(xmlString.Trim());
            string validationErrors = "";
            doc.Validate(schemas, (o, e) => { validationErrors += e.Message + "\n"; });

            if (!string.IsNullOrEmpty(validationErrors))
                throw new XmlSchemaValidationException(validationErrors);

            // Parse XML to List<QuestionModel>
            var questions = new List<QuestionModel>();
            var dataNodes = doc.Descendants("Data");
            foreach (var node in dataNodes)
            {
                var model = new QuestionModel
                {
                    Identifier = int.Parse(node.Element("Identifier")?.Value ?? "0"),
                    QuestionEn = node.Element("QuestionEn")?.Value,
                    ResponseAEn = node.Element("ResponseAEn")?.Value,
                    ResponseBEn = node.Element("ResponseBEn")?.Value,
                    ResponseCEn = node.Element("ResponseCEn")?.Value,
                    RightResponseEn = node.Element("RightResponseEn")?.Value,
                    QuestionFr = node.Element("QuestionFr")?.Value,
                    ResponseAFr = node.Element("ResponseAFr")?.Value,
                    ResponseBFr = node.Element("ResponseBFr")?.Value,
                    ResponseCFr = node.Element("ResponseCFr")?.Value,
                    RightResponseFr = node.Element("RightResponseFr")?.Value,
                    Image = node.Element("Image")?.Value
                };
                questions.Add(model);
            }

            // Insert into the correct table based on topic
            switch (topic?.ToLowerInvariant())
            {
                case "thermodynamics":
                    var thermoEntities = questions.Select(q => new Thermodynamics
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
                    }).ToList();
                    await _context.Thermodynamics.AddRangeAsync(thermoEntities);
                    await _context.SaveChangesAsync();
                    // Return all questions from Thermodynamics table
                    return _context.Thermodynamics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "electromagnetism":
                    var emEntities = questions.Select(q => new Electromagnetism
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
                    }).ToList();
                    await _context.Electromagnetism.AddRangeAsync(emEntities);
                    await _context.SaveChangesAsync();
                    return _context.Electromagnetism
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "mechanics":
                    var mechEntities = questions.Select(q => new Mechanics
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
                    }).ToList();
                    await _context.Mechanics.AddRangeAsync(mechEntities);
                    await _context.SaveChangesAsync();
                    return _context.Mechanics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "modernphysics":
                    var mpEntities = questions.Select(q => new ModernPhysics
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
                    }).ToList();
                    await _context.ModernPhysics.AddRangeAsync(mpEntities);
                    await _context.SaveChangesAsync();
                    return _context.ModernPhysics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "optics":
                    var opticsEntities = questions.Select(q => new Optics
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
                    }).ToList();
                    await _context.Optics.AddRangeAsync(opticsEntities);
                    await _context.SaveChangesAsync();
                    return _context.Optics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "relativity":
                    var relativityEntities = questions.Select(q => new Relativity
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
                    }).ToList();
                    await _context.Relativity.AddRangeAsync(relativityEntities);
                    await _context.SaveChangesAsync();
                    return _context.Relativity
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                default:
                    throw new ArgumentException("Unsupported topic type.");
            }
        }

        public async Task<List<QuestionModel>> DeleteQuestionAsync(string topic, int identifier)
        {
            switch (topic?.ToLowerInvariant())
            {
                case "thermodynamics":
                    var thermo = await _context.Thermodynamics.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (thermo == null) return null;
                    _context.Thermodynamics.Remove(thermo);
                    await _context.SaveChangesAsync();
                    return _context.Thermodynamics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "electromagnetism":
                    var em = await _context.Electromagnetism.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (em == null) return null;
                    _context.Electromagnetism.Remove(em);
                    await _context.SaveChangesAsync();
                    return _context.Electromagnetism
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "mechanics":
                    var mech = await _context.Mechanics.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (mech == null) return null;
                    _context.Mechanics.Remove(mech);
                    await _context.SaveChangesAsync();
                    return _context.Mechanics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "modernphysics":
                    var mp = await _context.ModernPhysics.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (mp == null) return null;
                    _context.ModernPhysics.Remove(mp);
                    await _context.SaveChangesAsync();
                    return _context.ModernPhysics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "optics":
                    var optics = await _context.Optics.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (optics == null) return null;
                    _context.Optics.Remove(optics);
                    await _context.SaveChangesAsync();
                    return _context.Optics
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                case "relativity":
                    var relativity = await _context.Relativity.FirstOrDefaultAsync(q => q.Identifier == identifier);
                    if (relativity == null) return null;
                    _context.Relativity.Remove(relativity);
                    await _context.SaveChangesAsync();
                    return _context.Relativity
                        .Select(q => new QuestionModel
                        {
                            Id = q.Id,
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
                        }).ToList();

                default:
                    throw new ArgumentException("Unsupported topic type.");
            }
        }
    }
}