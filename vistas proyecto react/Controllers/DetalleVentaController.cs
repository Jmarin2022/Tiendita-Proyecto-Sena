using ClosedXML.Excel;
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


        [HttpGet]
        [Route("MasVendidos")]
        public async Task<IActionResult> MasVendidos()
        {
            var productosMasVendidos = await _context.DetalleVentas
                .GroupBy(detalle => detalle.ProductoId)
                .Select(group => new
                {
                    ProductoId = group.Key,
                    TotalVendido = group.Sum(detalle => detalle.Cantidad)
                })
                .OrderByDescending(result => result.TotalVendido)
                .Take(10) // Obtener los 10 productos más vendidos
                .ToListAsync();

            var productosConNombre = new List<object>();

            foreach (var producto in productosMasVendidos)
            {
                var imagen = await _context.Imagens
                    .Where(i => i.IdImagen == producto.ProductoId)
                    .FirstOrDefaultAsync();

                if (imagen != null)
                {
                    productosConNombre.Add(new
                    {
                        ProductoId = producto.ProductoId,
                        NombreProducto = imagen.Nombre,
                        TotalVendido = producto.TotalVendido
                    });
                }
            }

            return Ok(productosConNombre);
        }


        [HttpGet]
        [Route("DescargarExcel")]
        public IActionResult DescargarExcel()
        {
            // Obtén los datos de las entradas desde tu base de datos
            var entradas = _context.DetalleVentas.ToList();

            // Crea un nuevo archivo Excel usando ClosedXML
            using (var workbook = new XLWorkbook())
            {
                // Agrega una hoja al archivo Excel
                var worksheet = workbook.Worksheets.Add("Ventas");

                var cuentas = entradas.Count + 1;
                // Itera a través de todas las filas y fusiona las celdas C y D
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"E{i}:G{i}").Merge();
                }
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"I{i}:J{i}").Merge();
                }
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"C{i}:D{i}").Merge();
                }
                for (int i = 1; i <= cuentas; i++)
                {
                    worksheet.Range($"A{i}:B{i}").Merge();
                }

                worksheet.Cell(1, 1).Value = "ID del detalle";
                worksheet.Cell(1, 3).Value = "Id de la venta";
                worksheet.Cell(1, 5).Value = "Nombre del producto";
                worksheet.Cell(1, 8).Value = "Cantidad";
                worksheet.Cell(1, 9).Value = "Total";


                // Rellena los datos de las entradas en filas
                for (int i = 0; i < entradas.Count; i++)
                {
                    var entrada = entradas[i];
                    worksheet.Cell(i + 2, 1).Value = entrada.Id;
                    worksheet.Cell(i + 2, 3).Value = entrada.VentaId;
                    worksheet.Cell(i + 2, 5).Value = entrada.ProductoId; // Accede a través de la relación Producto
                    worksheet.Cell(i + 2, 8).Value = entrada.Cantidad;
                    worksheet.Cell(i + 2, 9).Value = entrada.Total;
                }

                // Guarda el archivo Excel en una memoria temporal
                var stream = new MemoryStream();
                workbook.SaveAs(stream);
                stream.Seek(0, SeekOrigin.Begin);

                // Devuelve el archivo Excel como respuesta
                return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "detalleventa.xlsx");
            }
        }


    }
}