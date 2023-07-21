using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleVentaController : ControllerBase
    {
        private readonly TiendaContext _context;

        public DetalleVentaController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<DetalleVenta> detalleventa = _context.DetalleVentas.ToList();

            return StatusCode(StatusCodes.Status200OK, detalleventa);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] DetalleVenta request)
        {
            await _context.DetalleVentas.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            DetalleVenta detalle = await _context.DetalleVentas.FindAsync(id);
            if (detalle == null)
            {
                return NotFound();
            }

            _context.DetalleVentas.Remove(detalle);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] DetalleVenta request)
        {
            DetalleVenta DetalleVenta = await _context.DetalleVentas.FindAsync(id);
            if (DetalleVenta == null)
            {
                return NotFound();
            }
            
            DetalleVenta.ProductoId = request.ProductoId;
            DetalleVenta.Cantidad = request.Cantidad;
            DetalleVenta.Total = request.Total;

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet("detalle/{id:int}")]
        public async Task<IActionResult> GetDetalleVenta(int id)
        {
            var detalleVenta = await _context.DetalleVentas
                .Where(detalle => detalle.VentaId == id)
                .ToListAsync();

            return Ok(detalleVenta);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            DetalleVenta DetalleVenta = await _context.DetalleVentas.FindAsync(id);
            if (DetalleVenta == null)
            {
                return NotFound();
            }

            return Ok(DetalleVenta);
        }


    }
}
