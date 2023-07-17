using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Categoria
{
    public int IdCategoria { get; set; }

    public string? NombreC { get; set; }

    public string? Estado { get; set; }

    public int? IdImagen { get; set; }

    public virtual Imagen? IdImagenNavigation { get; set; }
}
