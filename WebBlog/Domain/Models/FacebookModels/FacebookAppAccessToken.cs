using Newtonsoft.Json;

namespace TouristApp.Domain.Models.FacebookModels
{
    internal class FacebookAppAccessToken
    {
        [JsonProperty("token_type")]
        public string TokenType { get; set; }

        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
    }
}
