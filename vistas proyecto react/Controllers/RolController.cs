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
            Rol.Estado = request.Estado;


        


            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        

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

        [HttpPut]
        [Route("ToggleEstado/{id:int}")]
        public async Task<IActionResult> ToggleEstado(int id)
        {
            try
            {
                var Rol = await _context.Rols.FindAsync(id);
                if (Rol == null)
                {
                    return NotFound();
                }

                // Cambia el estado de la imagen (por ejemplo, de Activo a Inactivo o viceversa)
                Rol.Estado = Rol.Estado == "Activo" ? "Inactivo" : "Activo";

                await _context.SaveChangesAsync();

                return Ok(Rol);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al cambiar el estado de la imagen: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("Buscar")]
        public async Task<IActionResult> Buscar(string busqueda)
        {
            if (string.IsNullOrEmpty(busqueda))
            {
                return BadRequest("El término de búsqueda no puede estar vacío.");
            }

            try
            {
                var rols = await _context.Rols
                    .Where(c => c.IdRol.ToString().Contains(busqueda) ||
                                c.Rol1.Contains(busqueda))
                            

                    .ToListAsync();

                return Ok(rols);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }



        [HttpGet]
        [Route("FiltrarActivos")]
        public async Task<IActionResult> FiltrarActivos()
        {
            try
            {
                List<Rol> imagenesActivas = await _context.Rols
                    .Where(img => img.Estado == "Activo")
                    .OrderByDescending(img => img.IdRol)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, imagenesActivas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener imágenes activas: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("FiltrarInactivos")]
        public async Task<IActionResult> FiltrarInactivos()
        {
            try
            {
                List<Rol> imagenesInactivas = await _context.Rols
                    .Where(img => img.Estado == "Inactivo")
                    .OrderByDescending(img => img.IdRol)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, imagenesInactivas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener imágenes inactivas: {ex.Message}");
            }
        }

    }
}
