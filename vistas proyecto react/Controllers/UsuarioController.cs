using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using vistas_proyecto_react.Models;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace vistas_proyecto_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly TiendaContext _context;

        public UsuarioController(TiendaContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<Usuario> Usuario = _context.Usuarios.ToList();

            return StatusCode(StatusCodes.Status200OK, Usuario);
        }


        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Usuario request)
        {
            await _context.Usuarios.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Usuario usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar(int id, [FromBody] Usuario request)
        {
            Usuario Usuario = await _context.Usuarios.FindAsync(id);
            if (Usuario == null)
            {
                return NotFound();
            }

            Usuario.Rol = request.Rol;
            Usuario.Usuario1 = request.Usuario1;
            Usuario.Contrasena = request.Contrasena;
            Usuario.Documento = request.Documento;
            Usuario.Estado = request.Estado;




            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "OK");
        }

        [HttpGet]
        [Route("Detalles/{id:int}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Usuarios == null)
            {
                return NotFound();
            }

            var Usuario = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.Id == id);
            if (Usuario == null)
            {
                return NotFound();
            }

            return StatusCode(StatusCodes.Status200OK, Usuario);
        }


        [HttpPut]
        [Route("ToggleEstado/{id:int}")]
        public async Task<IActionResult> ToggleEstado(int id)
        {
            try
            {
                var Usuario = await _context.Usuarios.FindAsync(id);
                if (Usuario == null)
                {
                    return NotFound();
                }

                // Cambia el estado de la imagen (por ejemplo, de Activo a Inactivo o viceversa)
                Usuario.Estado = Usuario.Estado == "Activo" ? "Inactivo" : "Activo";

                await _context.SaveChangesAsync();

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al cambiar el estado de la imagen: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetCliente(int id)
        {
            Usuario Usuario = await _context.Usuarios.FindAsync(id);
            if (Usuario == null)
            {
                return NotFound();
            }

            return Ok(Usuario);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuario request)
        {
            Usuario usuario = await _context.Usuarios
                .Include(u => u.RolNavigation)
                .FirstOrDefaultAsync(u => u.Usuario1 == request.Usuario1 && u.Contrasena == request.Contrasena && u.Estado == "Activo");

            if (usuario != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("tu_secreto_para_firmar_el_token");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Role, usuario.RolNavigation != null ? usuario.RolNavigation.Rol1 : "cliente"),
                        // Agregar más claims según la información que deseas incluir
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return Ok(new { token = tokenHandler.WriteToken(token), userCredentials = new { usuario.Usuario1, usuario.Contrasena } });
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Credenciales inválidas. Por favor, intente nuevamente.");
            }
        }



        [HttpGet]
        [Route("FiltrarInactivos")]
        public async Task<IActionResult> FiltrarInactivos()
        {
            try
            {
                List<Usuario> imagenesInactivas = await _context.Usuarios
                    .Where(usu => usu.Estado == "Inactivo")
                    .OrderByDescending(usu => usu.Id)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, imagenesInactivas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener imágenes inactivas: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("FiltrarActivos")]
        public async Task<IActionResult> FiltrarActivos()
        {
            try
            {
                List<Usuario> imagenesActivas = await _context.Usuarios
                    .Where(usu => usu.Estado == "Activo")
                    .OrderByDescending(usu => usu.Id)
                    .ToListAsync();

                return StatusCode(StatusCodes.Status200OK, imagenesActivas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener imágenes activas: {ex.Message}");
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
                var Usuario = await _context.Usuarios
                    .Where(c => c.Id.ToString().Contains(busqueda) ||
                                c.RolNavigation.Rol1.Contains(busqueda) ||
                                c.Documento.ToString().Contains(busqueda) ||
                                c.Usuario1.Contains(busqueda))

                    .ToListAsync();

                return Ok(Usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al buscar registros: {ex.Message}");
            }
        }

        [HttpPost("send-sms")]
        public IActionResult SendSms([FromBody] SmsRequest request)
        {
            var accountSid = "AC4432a41bdc91dd6c0d06342609a3f0e6";
            var authToken = "d0631821d882e9c0ab6569a3cfe31b57";
            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber(request.To));
            messageOptions.From = new PhoneNumber("+14705161438");
            messageOptions.Body = request.Body;

            var message = MessageResource.Create(messageOptions);
            return Ok(new { Message = "SMS sent successfully." });
        }

        public class SmsRequest
        {
            public string To { get; set; }
            public string Body { get; set; }
        }
    }
}
