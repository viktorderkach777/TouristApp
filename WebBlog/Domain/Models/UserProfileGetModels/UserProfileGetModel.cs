using System.ComponentModel.DataAnnotations;

namespace MyCalculation.Domain.Models.UserProfileGetModels
{
    public class UserProfileGetModel
    {
        [Required]
        public string Id { get; set; }
    }
}
