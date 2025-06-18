using System.Text.Json.Serialization;

namespace AplicacionWev.DTO
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public string Email { get; set; } = "";
        public string Celular { get; set; } = "";
        public string Direccion { get; set; } = "";

        [JsonPropertyName("contrasena")]
        public string Contrasena { get; set; } = "";
    }
}
