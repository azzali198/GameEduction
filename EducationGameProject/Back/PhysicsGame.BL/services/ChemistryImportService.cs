using System.Xml.Linq;
using System.Xml.Schema;
using PhysicsGame.DAL.Context;
using PhysicsGame.BL.Models;
using PhysicsGame.DAL.Entities;
using System.Xml;

public interface IChemistryImportService
{
    Task<List<ChemistryModel>> ValidateAndParseChemistryXmlAsync(string xmlString, string xsdString);
    Task<List<ChemistryModel>> GetChemistryQuestionsAsync();
    Task<List<ChemistryModel>> UpdateChemistryQuestionsAsync(List<ChemistryModel> questions);
    Task<List<ChemistryModel>> DeleteChemistryQuestionAsync(int id);
    Task<int> GetChemistryQuestionsCountAsync();
    Task<ChemistryModel> GetChemistryQuestionByIndexAsync(int index);
}

public class ChemistryImportService : IChemistryImportService
{
    private readonly PhysicsGameContext _context;

    public ChemistryImportService(PhysicsGameContext context)
    {
        _context = context;
    }

    public async Task<List<ChemistryModel>> ValidateAndParseChemistryXmlAsync(string xmlString, string xsdString)
    {
        var schemas = new XmlSchemaSet();
        using (var xsdReader = new StringReader(xsdString))
        {
            schemas.Add(null, XmlReader.Create(xsdReader));
        }

        XDocument doc = XDocument.Parse(xmlString.Trim());
        string validationErrors = "";
        doc.Validate(schemas, (o, e) => { validationErrors += e.Message + "\n"; });

        if (!string.IsNullOrEmpty(validationErrors))
            throw new XmlSchemaValidationException(validationErrors);

        var models = new List<ChemistryModel>();
        var dataNodes = doc.Descendants("Data");
        foreach (var node in dataNodes)
        {
            var model = new ChemistryModel
            {
                Definition = node.Element("Definition")?.Value,
                ChemicalData = node.Element("ChemicalData")?.Value,
                RightResponse = int.TryParse(node.Element("RightResponse")?.Value, out int rr) ? rr : 0,
                ResponseText = node.Element("ResponseText")?.Value
            };
            // Check for duplicate (by Definition and ChemicalData)
            if (!_context.Chemistry.Any(q => q.Definition == model.Definition && q.ChemicalData == model.ChemicalData))
                models.Add(model);
        }

        // Insert new models
        var entities = models.Select(m => new Chemistry
        {
            Definition = m.Definition,
            ChemicalData = m.ChemicalData,
            RightResponse = m.RightResponse,
            ResponseText = m.ResponseText
        }).ToList();

        await _context.Chemistry.AddRangeAsync(entities);
        await _context.SaveChangesAsync();

        return await GetChemistryQuestionsAsync();
    }

    public async Task<List<ChemistryModel>> GetChemistryQuestionsAsync()
    {
        return await Task.FromResult(_context.Chemistry
            .Select(q => new ChemistryModel
            {
                Id = q.Id,
                Definition = q.Definition,
                ChemicalData = q.ChemicalData,
                RightResponse = q.RightResponse,
                ResponseText = q.ResponseText
            }).ToList());
    }

    public async Task<List<ChemistryModel>> UpdateChemistryQuestionsAsync(List<ChemistryModel> questions)
    {
        foreach (var q in questions)
        {
            var entity = _context.Chemistry.FirstOrDefault(e => e.Id == q.Id);
            if (entity != null)
            {
                entity.Definition = q.Definition;
                entity.ChemicalData = q.ChemicalData;
                entity.RightResponse = q.RightResponse;
                entity.ResponseText = q.ResponseText;
            }
        }
        await _context.SaveChangesAsync();
        return await GetChemistryQuestionsAsync();
    }

    public async Task<List<ChemistryModel>> DeleteChemistryQuestionAsync(int id)
    {
        var entity = _context.Chemistry.FirstOrDefault(q => q.Id == id);
        if (entity == null) return null;
        _context.Chemistry.Remove(entity);
        await _context.SaveChangesAsync();
        return await GetChemistryQuestionsAsync();
    }

    public async Task<int> GetChemistryQuestionsCountAsync()
    {
        return await Task.FromResult(_context.Chemistry.Count());
    }

    public async Task<ChemistryModel> GetChemistryQuestionByIndexAsync(int index)
    {
        var questions = _context.Chemistry
            .OrderBy(q => q.Id)
            .Select(q => new ChemistryModel
            {
                Id = q.Id,
                Definition = q.Definition,
                ChemicalData = q.ChemicalData,
                RightResponse = q.RightResponse,
                ResponseText = q.ResponseText
            })
            .ToList();

        if (index < 0 || index >= questions.Count)
            return null;

        return questions[index];
    }
}