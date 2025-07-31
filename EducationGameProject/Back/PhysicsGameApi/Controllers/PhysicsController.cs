using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PhysicsGame.BL.Models;
using PhysicsGame.BL.Services;
using System.Xml;
using System.Xml.Schema;
using System.IO;
using System.Text.Json;

namespace PhysicsGameApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhysicsController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly IXmlImportService _xmlImportService;

        public PhysicsController(IQuizService quizService, IXmlImportService xmlImportService)
        {
            _quizService = quizService;
            _xmlImportService = xmlImportService;
        }

        [HttpPost("add-quiz")]
        public async Task<IActionResult> AddQuiz([FromBody] QuizData quizData)
        {
            if (quizData == null || quizData.Questions == null || quizData.Questions.Count == 0)
                return BadRequest("Quiz data or questions are missing.");

            try
            {
                await _quizService.AddQuizAsync(quizData);
                return Ok(new { message = "Quiz questions added successfully." });
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("import-xml")]
        public async Task<IActionResult> ImportXml([FromBody] XmlInput request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Xml))
                return BadRequest("XML string is missing.");

            var xsdPath = Path.Combine(Directory.GetCurrentDirectory(), "Files", "PhysicsModel.xsd");
            if (!System.IO.File.Exists(xsdPath))
                return BadRequest("XSD file not found.");

            try
            {
                var xsdString = await System.IO.File.ReadAllTextAsync(xsdPath);
               
                var questions = await _xmlImportService.ValidateAndParseXmlAsync(request.Xml, xsdString, request.Topic);
                return Ok(questions);
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

        [HttpDelete("delete-question")]
        public async Task<IActionResult> DeleteQuestion([FromBody] DeleteQuestionInput request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Topic))
                return BadRequest("Topic is missing.");
            if (request.Identifier <= 0)
                return BadRequest("Identifier is invalid.");

            try
            {
                var questions = await _xmlImportService.DeleteQuestionAsync(request.Topic, request.Identifier);
                if (questions == null)
                    return NotFound("Question not found.");
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class DeleteQuestionInput
        {
            public string Topic { get; set; }
            public int Identifier { get; set; }
        }
    }
    

}