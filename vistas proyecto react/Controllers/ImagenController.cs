using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using vistas_proyecto_react.Models;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagenController : ControllerBase
    {
        private readonly TiendaContext _context;

        public ImagenController(TiendaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Imagen> Imagen = _context.Imagens.OrderByDescending(t => t.IdImagen).ToList();

            return StatusCode(StatusCodes.Status200OK, Imagen);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Imagen request)
        {
            await _context.Imagens.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Imagen imagen = await _context.Imagens.FindAsync(id);
            if (imagen == null)
            {
                return NotFound();
            }

            _context.Imagens.Remove(imagen);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Imagen request)
        {
            Imagen Imagen = await _context.Imagens.FindAsync(id);
            if (Imagen == null)
            {
                return NotFound();
            }

            Imagen.Nombre = request.Nombre;
            Imagen.Descripcion = request.Descripcion;
            Imagen.Stock = request.Stock;
            Imagen.Precio = request.Precio;
            Imagen.Categoria = request.Categoria;
            Imagen.StockMax = request.StockMax;
            Imagen.StockMin = request.StockMin;
            Imagen.Imagen1 = request.Imagen1;


            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Imagens == null)
            {
                return NotFound();
            }

            var Imagen = await _context.Imagens
                .FirstOrDefaultAsync(m => m.IdImagen == id);
            if (Imagen == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Imagen);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Imagen Imagen = await _context.Imagens.FindAsync(id);
            if (Imagen == null)
            {
                return NotFound();
            }

            return Ok(Imagen);
        }


    }
}
