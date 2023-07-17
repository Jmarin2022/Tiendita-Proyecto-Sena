using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesPermisoController : ControllerBase
    {
        private readonly TiendaContext _context;

        public RolesPermisoController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<RolesPermiso> RolesPermiso = _context.RolesPermisos.OrderByDescending(t => t.IdRolPermisos).ToList();

            return StatusCode(StatusCodes.Status200OK, RolesPermiso);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] RolesPermiso request)
        {
            await _context.RolesPermisos.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            RolesPermiso rolesp = await _context.RolesPermisos.FindAsync(id);
            if (rolesp == null)
            {
                return NotFound();
            }

            _context.RolesPermisos.Remove(rolesp);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] RolesPermiso request)
        {
            RolesPermiso RolesPermiso = await _context.RolesPermisos.FindAsync(id);
            if (RolesPermiso == null)
            {
                return NotFound();
            }

            RolesPermiso.IdRol = request.IdRol;
            RolesPermiso.IdPermisos = request.IdPermisos;




            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.RolesPermisos == null)
            {
                return NotFound();
            }

            var RolesPermiso = await _context.RolesPermisos
                .FirstOrDefaultAsync(m => m.IdRolPermisos == id);
            if (RolesPermiso == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, RolesPermiso);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            RolesPermiso RolesPermiso = await _context.RolesPermisos.FindAsync(id);
            if (RolesPermiso == null)
            {
                return NotFound();
            }

            return Ok(RolesPermiso);
        }

    }
}
