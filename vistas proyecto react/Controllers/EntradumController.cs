using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntradumController : ControllerBase
    {
        private readonly TiendaContext _context;

        public EntradumController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Entradum> Entradum = _context.Entrada.OrderByDescending(t => t.IdEntrada).ToList();

            return StatusCode(StatusCodes.Status200OK, Entradum);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Entradum request)
        {
            await _context.Entrada.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Entradum entradas = await _context.Entrada.FindAsync(id);
            if (entradas == null)
            {
                return NotFound();
            }

            _context.Entrada.Remove(entradas);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Entradum request)
        {
            Entradum Entradum = await _context.Entrada.FindAsync(id);
            if (Entradum == null)
            {
                return NotFound();
            }

            Entradum.IdProductos = request.IdProductos;
            Entradum.Cantidad = request.Cantidad;
            Entradum.Proveedor = request.Proveedor;
            Entradum.Fecha = request.Fecha;

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Entrada == null)
            {
                return NotFound();
            }

            var Entradum = await _context.Entrada
                .FirstOrDefaultAsync(m => m.IdEntrada == id);
            if (Entradum == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Entradum);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Entradum Entradum = await _context.Entrada.FindAsync(id);
            if (Entradum == null)
            {
                return NotFound();
            }

            return Ok(Entradum);
        }

    }
}
