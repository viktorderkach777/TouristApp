﻿using Newtonsoft.Json;

namespace MyCalculation.Domain.Models.FacebookModels
{
    internal class FacebookPicture
    {
        public int Height { get; set; }

        public int Width { get; set; }

        [JsonProperty("is_silhouette")]
        public bool IsSilhouette { get; set; }

        public string Url { get; set; }
    }
}
