using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vistas_proyecto_react.Models;

using DinkToPdf; // Asegúrate de agregar la referencia a la biblioteca de generación de PDF
namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly TiendaContext _context;

        public ClienteController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Cliente> clientes = _context.Clientes.OrderByDescending(t => t.IdCliente).ThenBy(t => t.FechaRegistro).ToList();

            return StatusCode(StatusCodes.Status200OK, clientes);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Cliente request)
        {
            await _context.Clientes.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Cliente cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }


        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Cliente request)
        {
            Cliente cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            cliente.Nombre = request.Nombre;
            cliente.Apellido = request.Apellido;
            cliente.Celular = request.Celular;
            cliente.Direccion = request.Direccion;
            cliente.Estado = request.Estado;

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Clientes == null)
            {
                return NotFound();
            }

            var cliente = await _context.Clientes
                .FirstOrDefaultAsync(m => m.IdCliente == id);
            if (cliente == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, cliente);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Cliente cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        [HttpGet]
        [Route("Verificar/{documento}")]
        public async Task<IActionResult> VerificarCliente(int documento)
        {
            var clienteExistente = await _context.Clientes.FirstOrDefaultAsync(c => c.Documento == documento);

            if (clienteExistente != null)
            {
                return BadRequest(new { message = "El cliente ya existe en la base de datos." });
            }

            return Ok(new { message = "" });
        }



        //[HttpGet]
        //[Route("Buscar/{busqueda}")]
        //public async Task<IActionResult> Buscar(string busqueda)
        //{
        //    var clientes = await _context.Clientes
        //        .Where(c => c.IdCliente.ToString().Contains(busqueda) ||
        //                    c.Documento.ToString().Contains(busqueda) ||
        //                    c.Nombre.Contains(busqueda) ||
        //                    c.Apellido.Contains(busqueda) ||
        //                    c.Celular.Contains(busqueda) ||
        //                    c.FechaRegistro.ToString().Contains(busqueda))
        //        .ToListAsync();

        //    return StatusCode(StatusCodes.Status200OK, clientes);
        //}


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
                var clientes = await _context.Clientes
                    .Where(c => c.IdCliente.ToString().Contains(busqueda) ||
                                c.Documento.ToString().Contains(busqueda) ||
                                c.Nombre.Contains(busqueda) ||
                                c.Apellido.Contains(busqueda) ||
                                c.Celular.Contains(busqueda) ||
                                c.FechaRegistro.ToString().Contains(busqueda))
                    .ToListAsync();

                return Ok(clientes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("GenerarPDF")]
        public IActionResult GenerarPDF()
        {
            // Recupera los datos de los clientes que deseas incluir en el PDF
            var clientes = _context.Clientes.ToList();

            // Genera el contenido HTML del PDF
            var pdfGenerator = new PDFGenerator();
            var htmlContent = pdfGenerator.GenerateClientesPDF(clientes);

            // Convierte el HTML en PDF usando DinkToPdf
            var converter = new BasicConverter(new PdfTools());
            var pdfBytes = converter.Convert(new HtmlToPdfDocument
            {
                GlobalSettings = {
            PaperSize = PaperKind.A4,
            Orientation = Orientation.Landscape,
        },
                Objects = {
            new ObjectSettings
            {
                HtmlContent = htmlContent,
            }
        }
            });

            // Devuelve el PDF como una respuesta de archivo
            return File(pdfBytes, "application/pdf", "listado_clientes.pdf");
        }

    }
}
