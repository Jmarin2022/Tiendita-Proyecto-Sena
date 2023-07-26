using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using vistas_proyecto_react.Models;

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

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] Usuario request)
        {
            Usuario usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Usuario1 == request.Usuario1 && u.Contrasena == request.Contrasena);

            if (usuario != null)
            {
                // Generar el token JWT
                var key = Encoding.ASCII.GetBytes("tu_secreto_secreto_secreto"); // Utiliza la misma clave que configuraste en ConfigureServices
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, usuario.Usuario1),
                        // Puedes agregar más claims personalizados aquí si es necesario
                    }),
                    Expires = DateTime.UtcNow.AddHours(1), // Token caduca en 1 hora
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // Devolver el token al cliente (frontend)
                return Ok(new { Token = tokenString });
            }
            else
            {
                return StatusCode(StatusCodes.Status401Unauthorized, "Credenciales inválidas. Por favor, intente nuevamente.");
            }
        }


        [HttpPost]
        [Route("Cierre")]
        [Authorize] // Requiere que el usuario esté autenticado para acceder a este endpoint
        public IActionResult Logout()
        {
            try
            {
                // Aquí puedes agregar cualquier lógica adicional antes de invalidar el token, si es necesario.

                // Invalidar el token actual, si es válido y está presente en el encabezado de la solicitud.
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                if (!string.IsNullOrEmpty(token))
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("tu_secreto_secreto_secreto"); // Misma clave que usaste para generar el token en el login.
                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero // Sin margen de error en la expiración del token
                    }, out SecurityToken validatedToken);

                    // En este punto, el token es válido, por lo que puedes considerarlo como inválido (caducado) al construir un nuevo token con fecha de expiración en el pasado.
                    var jwtToken = (JwtSecurityToken)validatedToken;

                    // Construir un nuevo token con fecha de expiración en el pasado.
                    var newExpiration = DateTime.UtcNow.AddSeconds(-1);
                    var newToken = new JwtSecurityToken(
                        jwtToken.Issuer,
                        null, // Lista de audiencias vacía
                        jwtToken.Claims,
                        DateTime.UtcNow, // Valor actual de NotBefore
                        newExpiration, // Nueva fecha de expiración
                        jwtToken.SigningCredentials // Reutilizar las credenciales de firma del token original
                    );

                    // Generar el token en formato JWT.
                    var tokenString = tokenHandler.WriteToken(newToken);

                    // Devolver el token actualizado al cliente (frontend) para que pueda eliminarlo del almacenamiento local.
                    return Ok(new { Token = tokenString });
                }

                // Si no hay token o ya ha expirado, simplemente devuelve un mensaje de éxito.
                return Ok("Cierre de sesión exitoso");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
