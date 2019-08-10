using Newtonsoft.Json;

namespace MyCalculation.Domain.Models.FacebookModels
{
    internal class FacebookUserData
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Name { get; set; }

        [JsonProperty("first_name")]
        public string FirstName { get; set; }

        [JsonProperty("last_name")]
        public string LastName { get; set; }

        public FacebookPictureData Picture { get; set; }
    }
}
