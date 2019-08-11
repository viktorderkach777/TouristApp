using System.ComponentModel.DataAnnotations;

namespace TouristApp.Domain.Models.AccountModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
