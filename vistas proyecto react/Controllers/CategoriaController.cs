using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly TiendaContext _context;

        public CategoriaController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Categoria> Categoria = _context.Categorias.OrderByDescending(t => t.IdCategoria).ToList();

            return StatusCode(StatusCodes.Status200OK, Categoria);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Categoria request)
        {
            await _context.Categorias.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Categoria Categoria = await _context.Categorias.FindAsync(id);
            if (Categoria == null)
            {
                return NotFound();
            }

            _context.Categorias.Remove(Categoria);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Categoria request)
        {
            Categoria Categoria = await _context.Categorias.FindAsync(id);
            if (Categoria == null)
            {
                return NotFound();
            }

            Categoria.NombreC = request.NombreC;
            Categoria.Estado = request.Estado;
            Categoria.IdImagen = request.IdImagen;


            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Categorias == null)
            {
                return NotFound();
            }

            var Categoria = await _context.Categorias
                .FirstOrDefaultAsync(m => m.IdCategoria == id);
            if (Categoria == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Categoria);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Categoria Categoria = await _context.Categorias.FindAsync(id);
            if (Categoria == null)
            {
                return NotFound();
            }

            return Ok(Categoria);
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
                var Categoria = await _context.Categorias
                    .Where(c => c.IdCategoria.ToString().Contains(busqueda) ||
                                c.NombreC.Contains(busqueda) ||
                                c.Estado.Contains(busqueda) ||
                                c.IdImagen.ToString().Contains(busqueda))
                    .ToListAsync();

                return Ok(Categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("ToggleEstado/{id:int}")]
        public async Task<IActionResult> ToggleEstado(int id)
        {
            try
            {
                var Categoria = await _context.Categorias.FindAsync(id);
                if (Categoria == null)
                {
                    return NotFound();
                }

                // Cambia el estado de la imagen (por ejemplo, de Activo a Inactivo o viceversa)
                Categoria.Estado = Categoria.Estado == "Activo" ? "Inactivo" : "Activo";

                await _context.SaveChangesAsync();

                return Ok(Categoria);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al cambiar el estado de la imagen: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("FiltrarActivos")]
        public async Task<IActionResult> FiltrarActivos()
        {
            try
            {
                List<Categoria> imagenesActivas = await _context.Categorias
                    .Where(usu => usu.Estado == "Activo")
                    .OrderByDescending(usu => usu.IdCategoria)
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
                List<Categoria> imagenesInactivas = await _context.Categorias
                    .Where(usu => usu.Estado == "Inactivo")
                    .OrderByDescending(usu => usu.IdCategoria)
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
