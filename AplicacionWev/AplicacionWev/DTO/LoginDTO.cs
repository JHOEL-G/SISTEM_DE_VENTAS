using System.Text.Json.Serialization;

namespace AplicacionWev.DTO
{
    public class LoginDTO
    {

        [JsonPropertyName("email")]
        public string Email { get; set; } = "";

        [JsonPropertyName("contrasena")]
        public string Contrasena { get; set; } = "";
    }
}
