using System.ComponentModel.DataAnnotations;

namespace TouristApp.Domain.Models.UserProfileGetModels
{
    public class UserProfileGetModel
    {
        [Required]
        public string Id { get; set; }
    }
}
