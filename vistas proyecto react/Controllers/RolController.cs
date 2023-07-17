using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly TiendaContext _context;

        public RolController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Rol> Rol = _context.Rols.OrderByDescending(t => t.IdRol).ToList();

            return StatusCode(StatusCodes.Status200OK, Rol);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Rol request)
        {
            await _context.Rols.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Rol rol = await _context.Rols.FindAsync(id);
            if (rol == null)
            {
                return NotFound();
            }

            _context.Rols.Remove(rol);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Rol request)
        {
            Rol Rol = await _context.Rols.FindAsync(id);
            if (Rol == null)
            {
                return NotFound();
            }

            Rol.Rol1 = request.Rol1;
            Rol.Fecha = request.Fecha;




            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Rols == null)
            {
                return NotFound();
            }

            var Rol = await _context.Rols
                .FirstOrDefaultAsync(m => m.IdRol == id);
            if (Rol == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Rol);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Rol Rol = await _context.Rols.FindAsync(id);
            if (Rol == null)
            {
                return NotFound();
            }

            return Ok(Rol);
        }

    }
}
