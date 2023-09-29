using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Imagen
{
    public int IdImagen { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public int? Stock { get; set; }

    public int? Precio { get; set; }

    public string? Categoria { get; set; }

    public int? StockMax { get; set; }

    public int? StockMin { get; set; }

    public string? Imagen1 { get; set; }
    public string? Estado { get; set; }

    public virtual ICollection<Categoria> CategoriaNavigation { get; set; } = new List<Categoria>();

    public virtual ICollection<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();

    public virtual ICollection<Entradum> Entradas { get; set; } = new List<Entradum>();

}
