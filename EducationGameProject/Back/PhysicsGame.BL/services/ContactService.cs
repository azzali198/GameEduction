using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace PhysicsGame.BL.Services
{
    public class ContactEmailModel
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public string Institution { get; set; }
        public string EmailAddress { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public interface IContactService
    {
        Task SendContactEmailAsync(ContactEmailModel contactModel);
    }

    public class ContactService : IContactService
    {
        private readonly IConfiguration _configuration;

        public ContactService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendContactEmailAsync(ContactEmailModel contactModel)
        {
            var message = new MimeMessage();
            // Use the authenticated email as sender, not the contact's email
            message.From.Add(new MailboxAddress("Contact Form", "PhysicsIsFunny@gmx.fr"));
            message.ReplyTo.Add(new MailboxAddress(contactModel.Name, contactModel.EmailAddress));
            message.To.Add(new MailboxAddress("Physics Team", "PhysicsIsFunny@gmx.fr"));
            message.Subject = $"Contact Form: {contactModel.Subject}";

            message.Body = new TextPart("plain")
            {
                Text = $@"
                    Name: {contactModel.Name}
                    Category: {contactModel.Category}
                    Institution: {contactModel.Institution}
                    Email: {contactModel.EmailAddress}
                    
                    Subject: {contactModel.Subject}
                    
                    Message:
                    {contactModel.Message}
                "
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    // Bypass SSL certificate validation for development
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    
                    await client.ConnectAsync("smtp.gmx.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("PhysicsIsFunny@gmx.fr", "PhysicsIsFunny@2025");
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Email error: {ex.Message}");
                    throw new Exception($"Failed to send email: {ex.Message}");
                }
            }
        }
    }
}