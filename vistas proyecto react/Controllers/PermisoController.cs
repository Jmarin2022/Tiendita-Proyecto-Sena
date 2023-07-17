using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermisoController : ControllerBase
    {
        private readonly TiendaContext _context;

        public PermisoController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Permiso> Permiso = _context.Permisos.OrderByDescending(t => t.IdPermisos).ToList();

            return StatusCode(StatusCodes.Status200OK, Permiso);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Permiso request)
        { 
            await _context.Permisos.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Permiso Permisos = await _context.Permisos.FindAsync(id);
            if (Permisos == null)
            {
                return NotFound();
            }

            _context.Permisos.Remove(Permisos);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Permiso request)
        {
            Permiso Permiso = await _context.Permisos.FindAsync(id);
            if (Permiso == null)
            {
                return NotFound();
            }

            Permiso.Modulo = request.Modulo;
            Permiso.Crear = request.Crear;
            Permiso.Eliminar = request.Eliminar;
            Permiso.Editar = request.Editar;



            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Permisos == null)
            {
                return NotFound();
            }

            var Permiso = await _context.Permisos
                .FirstOrDefaultAsync(m => m.IdPermisos == id);
            if (Permiso == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Permiso);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Permiso Permiso = await _context.Permisos.FindAsync(id);
            if (Permiso == null)
            {
                return NotFound();
            }

            return Ok(Permiso);
        }


    }
}
