using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;
using PhysicsGame.BL.Models;
using PhysicsGame.BL.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Schema;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;

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


        // Remplacez la méthode UploadImagesZip par ce code (nécessite using Microsoft.Net.Http.Headers; using Microsoft.AspNetCore.WebUtilities;)
        [DisableRequestSizeLimit]
        [HttpPost("upload-images-zip")]
        public async Task<IActionResult> UploadImagesZip()
        {
            // Vérifie content-type multipart
            if (!Request.ContentType?.StartsWith("multipart/", StringComparison.OrdinalIgnoreCase) ?? true)
                return BadRequest("Content-Type must be multipart/form-data.");

            // Récupère la boundary
            var mediaType = MediaTypeHeaderValue.Parse(Request.ContentType);
            var boundary = HeaderUtilities.RemoveQuotes(mediaType.Boundary).Value;
            if (string.IsNullOrWhiteSpace(boundary))
                return BadRequest("Missing multipart boundary.");

            var reader = new MultipartReader(boundary, HttpContext.Request.Body);
            var section = await reader.ReadNextSectionAsync();

            string topic = null;
            string tempZipPath = null;

            try
            {
                while (section != null)
                {
                    if (ContentDispositionHeaderValue.TryParse(section.ContentDisposition, out var contentDisposition))
                    {
                        // Form field (topic)
                        if (contentDisposition.DispositionType.Equals("form-data") && string.IsNullOrEmpty(contentDisposition.FileName.Value))
                        {
                            var name = HeaderUtilities.RemoveQuotes(contentDisposition.Name).Value;
                            using var sr = new StreamReader(section.Body);
                            var value = await sr.ReadToEndAsync();
                            if (string.Equals(name, "Topic", StringComparison.OrdinalIgnoreCase) ||
                                string.Equals(name, "topic", StringComparison.OrdinalIgnoreCase))
                            {
                                topic = value?.Trim();
                            }
                        }
                        // File field
                        else if (!string.IsNullOrEmpty(contentDisposition.FileName.Value) || !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value))
                        {
                            var fileName = HeaderUtilities.RemoveQuotes(contentDisposition.FileName).Value ?? HeaderUtilities.RemoveQuotes(contentDisposition.FileNameStar).Value;
                            if (!fileName.EndsWith(".zip", StringComparison.OrdinalIgnoreCase))
                                return BadRequest("Only ZIP archive is accepted.");

                            // Sauvegarde stream vers fichier temporaire (streaming)
                            tempZipPath = Path.GetTempFileName();
                            using var targetStream = System.IO.File.Create(tempZipPath);
                            await section.Body.CopyToAsync(targetStream);
                        }
                    }

                    section = await reader.ReadNextSectionAsync();
                }

                if (string.IsNullOrWhiteSpace(topic))
                    return BadRequest("Topic is missing.");
                if (string.IsNullOrEmpty(tempZipPath) || !System.IO.File.Exists(tempZipPath))
                    return BadRequest("Zip file is missing.");

                // Dossier topic
                var topicFolder = Path.Combine(Directory.GetCurrentDirectory(), "Files", topic);
                if (!Directory.Exists(topicFolder))
                    Directory.CreateDirectory(topicFolder);

                // Extraction et validation
                using (var archive = ZipFile.OpenRead(tempZipPath))
                {
                    foreach (var entry in archive.Entries)
                    {
                        if (string.IsNullOrWhiteSpace(entry.Name))
                            continue; // skip folders

                        if (!entry.Name.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                            return BadRequest($"File '{entry.Name}' is not a PNG image.");

                        var destinationPath = Path.Combine(topicFolder, entry.Name);
                        entry.ExtractToFile(destinationPath, overwrite: true);
                    }
                }

                return Ok(new { message = "Images uploaded and extracted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error processing zip file: {ex.Message}");
            }
            finally
            {
                try { if (!string.IsNullOrEmpty(tempZipPath) && System.IO.File.Exists(tempZipPath)) System.IO.File.Delete(tempZipPath); } catch { }
            }
        }

        [HttpGet("count-questions-by-branch")]
        public IActionResult GetQuestionsCountByBranch()
        {
            var result = _xmlImportService.GetQuestionsCountByBranch();
            return Ok(result);
        }

        [HttpGet("get-question-by-branch-and-index")]
        public async Task<IActionResult> GetQuestionByBranchAndIndex([FromQuery] string branch, [FromQuery] int index)
        {
            if (string.IsNullOrWhiteSpace(branch))
                return BadRequest("Physics branch is missing.");
            if (index < 0)
                return BadRequest("Index must be non-negative.");

            try
            {
                var question = await _xmlImportService.GetQuestionByBranchAndIndexAsync(branch, index);
                if (question == null)
                    return NotFound("No question found for this branch and index.");
                return Ok(question);
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