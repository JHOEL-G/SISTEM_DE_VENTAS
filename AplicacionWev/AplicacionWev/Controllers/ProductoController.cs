using AplicacionWev.Data;
using AplicacionWev.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicacionWev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductoController(AppDbContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProducto ()
        {
            return await _context.Productos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(Guid id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            return producto;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto (Producto producto)
        {
            if (await _context.Productos.AnyAsync(p => p.Codigo == producto.Codigo))
            {
                return Conflict(new { message = "El código del producto ya existe. Por favor usa uno diferente" });
            }

            producto.Id = Guid.NewGuid();
            producto.CreatedAt = DateTime.Now;
            producto.UpdatedAt = DateTime.Now;
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

        [HttpPut("{id}")]
        public async  Task<IActionResult> PutProducto(Guid id, Producto producto)
        {
            if (id != producto.Id)
            {
                return BadRequest("El ID del producto en la URL no coincide con el ID del producto de la base de datos de la solicitud");
            }

            var existingProducto = await _context.Productos.FindAsync(id);

            if (existingProducto == null)
            {
                return NotFound("Peoducto no encontrado");
            }

            if (existingProducto.Codigo != producto.Codigo && await _context.Productos.AnyAsync(p => p.Codigo == producto.Codigo && p.Id != producto.Id))
            {
                return Conflict(new { message = "Ya existe un producto con ese codigo. Por favor, usa una diferente" });
            }

            _context.Entry(existingProducto).CurrentValues.SetValues(producto);
            existingProducto.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id)) 
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto (Guid id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        private bool ProductExists(Guid id)
        {
            return _context.Productos.Any(e => e.Id == id);
        }
    }
}
