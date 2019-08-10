using System.ComponentModel.DataAnnotations;

namespace MyCalculation.Domain.Models.AccountModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
