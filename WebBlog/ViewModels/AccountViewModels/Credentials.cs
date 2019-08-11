using System.ComponentModel.DataAnnotations;

namespace TouristApp.ViewModels.AccountViewModels
{
    public class Credentials
    {
        [Required(ErrorMessage = "Поле є обов'язковим")]
        [EmailAddress(ErrorMessage = "Не валідна пошта")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Поле є обов'язковим")]
        public string Password { get; set; }
    }
}
