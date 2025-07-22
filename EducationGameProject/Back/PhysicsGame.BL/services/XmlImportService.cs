using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Schema;
using PhysicsGame.BL.Models;

namespace PhysicsGame.BL.Services
{
    public interface IXmlImportService
    {
        Task<List<QuestionModel>> ValidateAndParseXmlAsync(string xmlString, string xsdString);
    }

    public class XmlImportService : IXmlImportService
    {
        public async Task<List<QuestionModel>> ValidateAndParseXmlAsync(string xmlString, string xsdString)
        {
            // Validate XML against XSD
            var schemas = new XmlSchemaSet();
            using (var xsdReader = new StringReader(xsdString))
            {
                schemas.Add(null, XmlReader.Create(xsdReader));
            }

            var settings = new XmlReaderSettings
            {
                ValidationType = ValidationType.Schema,
                Schemas = schemas
            };

            settings.ValidationEventHandler += (sender, args) =>
            {
                if (args.Severity == XmlSeverityType.Error)
                    throw new XmlSchemaValidationException(args.Message);
            };

            using (var xmlReader = XmlReader.Create(new StringReader(xmlString), settings))
            {
                while (xmlReader.Read()) { /* Just validate */ }
            }

            // Parse XML to List<QuestionModel>
            var questions = new List<QuestionModel>();
            var xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xmlString);

            var questionNodes = xmlDoc.SelectNodes("//Question");
            foreach (XmlNode node in questionNodes)
            {
                var model = new QuestionModel
                {
                    Identifier = int.Parse(node["Identifier"]?.InnerText ?? "0"),
                    QuestionEn = node["QuestionEn"]?.InnerText,
                    ResponseAEn = node["ResponseAEn"]?.InnerText,
                    ResponseBEn = node["ResponseBEn"]?.InnerText,
                    ResponseCEn = node["ResponseCEn"]?.InnerText,
                    RightResponseEn = node["RightResponseEn"]?.InnerText,
                    QuestionFr = node["QuestionFr"]?.InnerText,
                    ResponseAFr = node["ResponseAFr"]?.InnerText,
                    ResponseBFr = node["ResponseBFr"]?.InnerText,
                    ResponseCFr = node["ResponseCFr"]?.InnerText,
                    RightResponseFr = node["RightResponseFr"]?.InnerText,
                    Image = node["Image"]?.InnerText
                };
                questions.Add(model);
            }

            return await Task.FromResult(questions);
        }
    }
}