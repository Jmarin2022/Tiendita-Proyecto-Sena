using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Cliente
{
    public int IdCliente { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Celular { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public DateTime FechaRegistro { get; set; }

    public string Estado { get; set; } = null!;
}
