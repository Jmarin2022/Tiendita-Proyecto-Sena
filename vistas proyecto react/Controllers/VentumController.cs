using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentumController : ControllerBase
    {
        private readonly TiendaContext _context;

        public VentumController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Ventum> Venta = _context.Venta.OrderByDescending(t => t.Id).ToList();

            return StatusCode(StatusCodes.Status200OK, Venta);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Ventum Venta)
        {
            await _context.Venta.AddAsync(Venta);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Ventum ventas = await _context.Venta.FindAsync(id);
            if (ventas == null)
            {
                return NotFound();
            }

            _context.Venta.Remove(ventas);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Ventum request)
        {
            Ventum Ventum = await _context.Venta.FindAsync(id);
            if (Ventum == null)
            {
                return NotFound();
            }

            Ventum.Cliente = request.Cliente;
            Ventum.Fechaventa = request.Fechaventa;
            Ventum.Total = request.Total;




            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.DetalleVentas == null)
            {
                return NotFound();
            }

            var DetalleVenta = await _context.DetalleVentas
                .FirstOrDefaultAsync(m => m.Id == id);
            if (DetalleVenta == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, DetalleVenta);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Ventum Ventum = await _context.Venta.FindAsync(id);
            if (Ventum == null)
            {
                return NotFound();
            }

            return Ok(Ventum);
        }

    }
}

