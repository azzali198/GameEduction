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
using System.IO.Compression;

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

        [HttpGet("get-questions")]
        public async Task<IActionResult> GetQuestions([FromQuery] string topic)
        {
            if (string.IsNullOrWhiteSpace(topic))
                return BadRequest("Topic is missing.");

            try
            {
                var questions = await _xmlImportService.GetQuestionsByTopicAsync(topic);
                return Ok(questions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-questions")]
        public async Task<IActionResult> UpdateQuestions([FromBody] UpdateQuestionsInput request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Topic) || request.Questions == null || request.Questions.Count == 0)
                return BadRequest("Topic or questions are missing.");

            try
            {
                var updatedQuestions = await _xmlImportService.UpdateQuestionsAsync(request.Topic, request.Questions);
                return Ok(updatedQuestions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("upload-images-zip")]
        public async Task<IActionResult> UploadImagesZip([FromForm] UploadImagesZipInput input)
        {
            var zipFile = input.ZipFile;
            var topic = input.Topic;

            if (zipFile == null || zipFile.Length == 0)
                return BadRequest("Zip file is missing.");
            if (string.IsNullOrWhiteSpace(topic))
                return BadRequest("Topic is missing.");

            // Create topic folder if not exists
            var topicFolder = Path.Combine(Directory.GetCurrentDirectory(), "Files", topic);
            if (!Directory.Exists(topicFolder))
                Directory.CreateDirectory(topicFolder);

            // Save zip to temp location
            var tempZipPath = Path.GetTempFileName();
            using (var stream = new FileStream(tempZipPath, FileMode.Create))
            {
                await zipFile.CopyToAsync(stream);
            }

            // Unzip and validate files
            try
            {
                using (var archive = ZipFile.OpenRead(tempZipPath))
                {
                    foreach (var entry in archive.Entries)
                    {
                        if (string.IsNullOrWhiteSpace(entry.Name))
                            continue; // Skip folders

                        if (!entry.Name.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                            return BadRequest($"File '{entry.Name}' is not a PNG image.");

                        var destinationPath = Path.Combine(topicFolder, entry.Name);
                        entry.ExtractToFile(destinationPath, overwrite: true);
                    }
                }
                System.IO.File.Delete(tempZipPath);
                return Ok(new { message = "Images uploaded and extracted successfully." });
            }
            catch (Exception ex)
            {
                System.IO.File.Delete(tempZipPath);
                return BadRequest($"Error processing zip file: {ex.Message}");
            }
        }

        public class DeleteQuestionInput
        {
            public string Topic { get; set; }
            public int Identifier { get; set; }
        }

        public class UpdateQuestionsInput
        {
            public string Topic { get; set; }
            public List<QuestionModel> Questions { get; set; }
        }

        public class UploadImagesZipInput
        {
            [FromForm]
            public IFormFile ZipFile { get; set; }
            [FromForm]
            public string Topic { get; set; }
        }
    }
    

}