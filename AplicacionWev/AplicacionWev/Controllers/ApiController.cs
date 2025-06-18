using AplicacionWev.Data;
using AplicacionWev.DTO;
using AplicacionWev.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AplicacionWev.Controllers
{

    [ApiController]
    [Route("/[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public ApiController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("registro")]
        public async Task<IActionResult> Registro([FromBody] UsuarioDTO dto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "El correo electrónico ya está en uso." });
            }

            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Celular = dto.Celular,
                Direccion = dto.Direccion,
                Contrasena = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "usuario registrado correctamente",
                usuario = new
                {
                    nombre = usuario.Nombre,
                    apellido = usuario.Apellido,
                    email = usuario.Email,
                    celular = usuario.Celular,
                    direccion = usuario.Direccion
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            Console.WriteLine($"Login recibido: Email = {dto.Email}, Contraseña = {dto.Contrasena}");
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Contrasena, usuario.Contrasena))
            {
                return Unauthorized(new{ message = "El correo no Existe ." });
            }

            var token = GenerarJwt(usuario);

            return Ok(new
            {
                token,
                usuario = new
                {
                    nombre = usuario.Nombre,
                    apellido = usuario.Apellido,
                    email = usuario.Email,
                    celular = usuario.Celular,
                    direccion = usuario.Direccion
                }
            });
        }

        private string GenerarJwt(Usuario usuario) 
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nombre),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [Authorize]
        [HttpGet("perfil")]
        public async Task<IActionResult> Perfil()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null) return Unauthorized();

            int userId = int.Parse(userIdClaim);
            var usuario = await _context.Usuarios.FindAsync(userId);
            if (usuario == null) return NotFound();

            return Ok(new
            {
                nombre = usuario.Nombre,
                email = usuario.Email,
                apellido = usuario.Apellido,
                celular = usuario.Celular,
                direccion = usuario.Direccion
            });
        }
    }
}
