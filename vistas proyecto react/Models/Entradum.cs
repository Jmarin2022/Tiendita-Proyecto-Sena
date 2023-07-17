using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Entradum
{
    public int IdEntrada { get; set; }

    public int IdProductos { get; set; }

    public int? Cantidad { get; set; }

    public string? Proveedor { get; set; }

    public DateTime Fecha { get; set; }

    public virtual Imagen? Producto { get; set; }

}
