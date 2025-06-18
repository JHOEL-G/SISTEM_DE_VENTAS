using AplicacionWev.Data;
using AplicacionWev.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AplicacionWev.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly AppDbContext _context; 

        public StockController (AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockMon>>> GetStock()
        {
            return await _context.StockMon.ToListAsync();
        }

        [HttpPost("entrada")]
        public async Task<ActionResult<StockMon>> PostStock([FromBody]StockMon mon)
        {
            mon.Type = "entrada";
            mon.Id = Guid.NewGuid();
            mon.Timestamp = DateTime.UtcNow;
            mon.Fecha = mon.Fecha.Date;

            var producto = await _context.Productos.FindAsync(mon.ProductoId);
            if (producto == null)
            {
                return NotFound("Producto no encontrado");
            }

            mon.ProductoName = producto.Nombre;

            producto.StockActual += mon.Cantidad;
            producto.UpdatedAt = DateTime.UtcNow;

            _context.StockMon.Add(mon);
            _context.Entry(producto).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStock), new { id = mon.Id }, mon);
        }

        [HttpPost("salida")]
        public async Task<ActionResult<StockMon>> PostStockSalida([FromBody]StockMon mon)
        {
            mon.Type = "salida";
            mon.Id = Guid.NewGuid();
            mon.Timestamp = DateTime.UtcNow;
            mon.Fecha = mon.Fecha.Date;

            var producto = await _context.Productos.FindAsync(mon.ProductoId);
            if (producto == null)
            {
                return NotFound("Producto no encontrado");
            }

            mon.ProductoName = producto.Nombre;

            if (producto.StockActual < mon.Cantidad)
            {
                return BadRequest("Stock insuficiente para la salida");
            }
            mon.ProductoName = producto.Nombre;
            producto.StockActual -= mon.Cantidad;
            producto.UpdatedAt = DateTime.UtcNow;
            _context.StockMon.Add(mon);
            _context.Entry(producto).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStock), new { id = mon.Id }, mon);
        }

    }
}
