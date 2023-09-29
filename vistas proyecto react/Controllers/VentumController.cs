using ClosedXML.Excel;
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

        [HttpGet]
        [Route("DescargarExcel")]
        public IActionResult DescargarExcel()
        {
            // Obtén los datos de las entradas desde tu base de datos
            var entradas = _context.Venta.ToList();

            // Crea un nuevo archivo Excel usando ClosedXML
            using (var workbook = new XLWorkbook())
            {
                // Agrega una hoja al archivo Excel
                var worksheet = workbook.Worksheets.Add("Ventas");

                var cuentas = entradas.Count + 1;
                // Itera a través de todas las filas y fusiona las celdas C y D
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"C{i}:D{i}").Merge();
                }
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"E{i}:F{i}").Merge();
                }

                worksheet.Cell(1, 1).Value = "ID Venta";
                worksheet.Cell(1, 2).Value = "Nombre del cliente";
                worksheet.Cell(1, 3).Value = "Fecha de la venta";
                worksheet.Cell(1, 5).Value = "Total de la venta";


                // Rellena los datos de las entradas en filas
                for (int i = 0; i < entradas.Count; i++)
                {
                    var entrada = entradas[i];
                    worksheet.Cell(i + 2, 1).Value = entrada.Id;
                    worksheet.Cell(i + 2, 2).Value = entrada.Cliente; // Accede a través de la relación Producto
                    worksheet.Cell(i + 2, 3).Value = entrada.Fechaventa;
                    worksheet.Cell(i + 2, 5).Value = entrada.Total;
                }

                // Guarda el archivo Excel en una memoria temporal
                var stream = new MemoryStream();
                workbook.SaveAs(stream);
                stream.Seek(0, SeekOrigin.Begin);

                // Devuelve el archivo Excel como respuesta
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ventas.xlsx");
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
                var Venta = await _context.Venta
                    .Where(c => c.Id.ToString().Contains(busqueda) ||
                                c.Cliente.Contains(busqueda) ||
                                c.Fechaventa.ToString().Contains(busqueda) ||
                                c.Total.ToString().Contains(busqueda))

                    .ToListAsync();

                return Ok(Venta);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }


    }
}