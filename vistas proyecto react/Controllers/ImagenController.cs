using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using vistas_proyecto_react.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagenController : ControllerBase
    {
        private readonly TiendaContext _context;
        private readonly IWebHostEnvironment _environment;

        public ImagenController(TiendaContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
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
            Imagen.Estado = request.Estado;


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

        //[HttpPost("Upload")]
        //public IActionResult UploadImage(IFormFile image)
        //{
        //    try
        //    {
        //        if (image == null || image.Length == 0)
        //        {
        //            return BadRequest("No se proporcionó una imagen válida.");
        //        }

        //        string destinationPath = @"D:\Apis\api3\Tiendita-Proyecto-Sena\vistas proyecto react\ClientApp\src\componentes\imagen\img";
        //        if (!Directory.Exists(destinationPath))
        //        {
        //            Directory.CreateDirectory(destinationPath);
        //        }

        //        string originalFileName = Path.GetFileName(image.FileName);
        //        string filePath = Path.Combine(destinationPath, originalFileName);

        //        // Guardar la imagen en el directorio de destino
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            image.CopyTo(stream);
        //        }

        //        // Crear un nuevo objeto Imagen y asignar el nombre del archivo
        //        Imagen newImage = new Imagen
        //        {
        //            Imagen1 = originalFileName
        //        };

        //        // Agregar el nuevo objeto Imagen a la base de datos
        //        _context.Imagens.Add(newImage);
        //        _context.SaveChanges();

        //        string fullPath = Path.Combine("componentes/imagen/img", originalFileName);

        //        return Ok(new { Message = "Imagen subida correctamente.", FilePath = fullPath });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar(IFormFile imageFile, [FromForm] Imagen request)
        {
            if (imageFile == null || imageFile.Length <= 0)
            {
                return BadRequest("La imagen no se ha proporcionado.");
            }

            try
            {
                // Ruta del directorio donde se guardarán las imágenes
                string imageDirectory = Path.Combine(_environment.ContentRootPath, "ClientApp/src/componentes/imagen/img");

                // Crear el directorio si no existe
                if (!Directory.Exists(imageDirectory))
                {
                    Directory.CreateDirectory(imageDirectory);
                }

                // Generar un nombre único para la imagen
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + imageFile.FileName;

                // Ruta completa del archivo de imagen
                string filePath = Path.Combine(imageDirectory, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                // Guardar información en la base de datos
                request.Imagen1 = uniqueFileName;  // Asignar el nombre único de la imagen

                await _context.Imagens.AddAsync(request);
                await _context.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "OK");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }





        [HttpGet]
        [Route("Verificar/{nombre}")]
        public async Task<IActionResult> VerificarCliente(String nombre)
        {
            var clienteExistente = await _context.Imagens.FirstOrDefaultAsync(c => c.Nombre == nombre);

            if (clienteExistente != null)
            {
                return BadRequest(new { message = "Ya existe un producto con el mismo nombre." });
            }

            return Ok(new { message = "" });
        }


        [Route("Buscar")]
        public async Task<IActionResult> Buscar(string busqueda)
        {
            if (string.IsNullOrEmpty(busqueda))
            {
                return BadRequest("El término de búsqueda no puede estar vacío.");
            }

            try
            {
                var imagenes = await _context.Imagens
                    .Where(c => c.IdImagen.ToString().Contains(busqueda) ||
                                c.Nombre.Contains(busqueda) ||
                                c.Estado.Contains(busqueda) ||
                                c.Categoria.Contains(busqueda))

                    .ToListAsync();

                return Ok(imagenes);
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
                var imagen = await _context.Imagens.FindAsync(id);
                if (imagen == null)
                {
                    return NotFound();
                }

                // Cambia el estado de la imagen (por ejemplo, de Activo a Inactivo o viceversa)
                imagen.Estado = imagen.Estado == "Activo" ? "Inactivo" : "Activo";

                await _context.SaveChangesAsync();

                return Ok(imagen);
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
                List<Imagen> imagenesActivas = await _context.Imagens
                    .Where(img => img.Estado == "Activo")
                    .OrderByDescending(img => img.IdImagen)
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
                List<Imagen> imagenesInactivas = await _context.Imagens
                    .Where(img => img.Estado == "Inactivo")
                    .OrderByDescending(img => img.IdImagen)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, imagenesInactivas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener imágenes inactivas: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("ListaCelular")]
        public async Task<IActionResult> ListaCelular()
        {
            List<Imagen> imagenes = _context.Imagens
                .OrderBy(u => u.Stock)
                .ThenBy(u => u.StockMin)
                .ToList();

            return StatusCode(StatusCodes.Status200OK, imagenes);
        }



    }

}