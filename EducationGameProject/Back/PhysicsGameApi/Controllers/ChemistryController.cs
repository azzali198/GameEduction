using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System.Xml.Schema;
using System.IO;
using PhysicsGame.BL.Models;
using PhysicsGame.BL.Services;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChemistryController : ControllerBase
    {
        private readonly IChemistryImportService _chemistryImportService;

        public ChemistryController(IChemistryImportService chemistryImportService)
        {
            _chemistryImportService = chemistryImportService;
        }
    public class ChemistryXmlInput
    {
       
        [FromForm]
        public IFormFile? XmlFile { get; set; }
    }
        [HttpGet("get-questions")]
        public async Task<IActionResult> GetQuestions()
        {
            try
            {
                var questions = await _chemistryImportService.GetChemistryQuestionsAsync();
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("count-questions")]
        public async Task<IActionResult> GetChemistryQuestionsCount()
        {
            var count = await _chemistryImportService.GetChemistryQuestionsCountAsync();
            return Ok(count);
        }

        [HttpPut("update-questions")]
        public async Task<IActionResult> UpdateQuestions([FromBody] List<ChemistryModel> questions)
        {
            if (questions == null || questions.Count == 0)
                return BadRequest("Questions are missing.");

            try
            {
                var updatedQuestions = await _chemistryImportService.UpdateChemistryQuestionsAsync(questions);
                return Ok(updatedQuestions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-question/{id}")]
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest("Identifier is invalid.");

            try
            {
                var questions = await _chemistryImportService.DeleteChemistryQuestionAsync(id);
                if (questions == null)
                    return NotFound("Question not found.");
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("import-xml")]
        public async Task<IActionResult> ImportXml([FromForm] ChemistryXmlInput input)
        {
            var xmlFile = input.XmlFile;

            if (xmlFile == null || xmlFile.Length == 0)
                return BadRequest("XML file is missing.");

            var xsdPath = Path.Combine(Directory.GetCurrentDirectory(), "Files", "ChemistryModel.xsd");
            if (!System.IO.File.Exists(xsdPath))
                return BadRequest("XSD file not found.");

            string xmlString;
            using (var reader = new StreamReader(xmlFile.OpenReadStream()))
            {
                xmlString = await reader.ReadToEndAsync();
            }

            try
            {
                var xsdString = await System.IO.File.ReadAllTextAsync(xsdPath);
                var result = await _chemistryImportService.ValidateAndParseChemistryXmlAsync(xmlString, xsdString);
                return Ok(result);
            }
            catch (XmlSchemaValidationException ex)
            {
                return BadRequest($"XML validation error: {ex.Message}");
            }
            catch (XmlException ex)
            {
                return BadRequest($"XML parsing error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-question-by-index/{index}")]
        public async Task<IActionResult> GetQuestionByIndex([FromRoute] int index)
        {
            if (index < 0)
                return BadRequest("Index must be non-negative.");

            try
            {
                var question = await _chemistryImportService.GetChemistryQuestionByIndexAsync(index);
                if (question == null)
                    return NotFound("No question found at this index.");
                return Ok(question);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }


    
  
}