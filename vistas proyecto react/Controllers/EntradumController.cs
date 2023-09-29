using ClosedXML.Excel;
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
                var entradas = await _context.Entrada
                    .Where(e => e.Producto.Nombre.Contains(busqueda) ||
                                e.Cantidad.ToString().Contains(busqueda) ||
                                e.Proveedor.Contains(busqueda))
                    .ToListAsync();

                return Ok(entradas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("DescargarExcel")]
        public IActionResult DescargarExcel()
        {
            // Obtén los datos de las entradas desde tu base de datos
            var entradas = _context.Entrada.Include(e => e.Producto).ToList();

            // Crea un nuevo archivo Excel usando ClosedXML
            using (var workbook = new XLWorkbook())
            {
                // Agrega una hoja al archivo Excel
                var worksheet = workbook.Worksheets.Add("Entradas");

                // Agrega encabezados de columna
                worksheet.Cell(1, 1).Value = "ID Entrada";
                worksheet.Cell(1, 2).Value = "Producto";
                worksheet.Cell(1, 3).Value = "Cantidad";
                worksheet.Cell(1, 4).Value = "Proveedor";
                worksheet.Cell(1, 5).Value = "Fecha Registro";

                // Rellena los datos de las entradas en filas
                for (int i = 0; i < entradas.Count; i++)
                {
                    var entrada = entradas[i];
                    worksheet.Cell(i + 2, 1).Value = entrada.IdEntrada;
                    worksheet.Cell(i + 2, 2).Value = entrada.Producto?.Nombre; // Accede a través de la relación Producto
                    worksheet.Cell(i + 2, 3).Value = entrada.Cantidad;
                    worksheet.Cell(i + 2, 4).Value = entrada.Proveedor;
                    // Establece el formato de número de la celda para la fecha
                    worksheet.Cell(i + 2, 5).Value = entrada.Fecha;
                    worksheet.Cell(i + 2, 5).Style.NumberFormat.Format = "yyyy-MM-dd"; // Cambia el formato según tu preferencia
                    worksheet.Column(5).AdjustToContents(); // Ajusta el ancho de la columna automáticamente
                }

                // Guarda el archivo Excel en una memoria temporal
                var stream = new MemoryStream();
                workbook.SaveAs(stream);
                stream.Seek(0, SeekOrigin.Begin);

                // Devuelve el archivo Excel como respuesta
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "entradas.xlsx");
            }
        }


    }
}
