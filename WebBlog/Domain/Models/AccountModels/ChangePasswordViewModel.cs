using System.ComponentModel.DataAnnotations;

namespace MyCalculation.Domain.Models.AccountModels
{
    public class ChangePasswordViewModel
    {
        [Required]
        public string Id { get; set; }

        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Cant't be empty")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Password must be at least 6 characters and contain digits, upper and lower case")]
        public string NewPassword { get; set; }
    }
}
