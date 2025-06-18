namespace AplicacionWev.Model
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public string Email { get; set; } = "";
        public string Celular { get; set; } = "";
        public string Direccion { get; set; } = "";
        public string Contrasena { get; set; } = "";
    }
}
