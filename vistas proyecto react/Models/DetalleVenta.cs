using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class DetalleVenta
{
    public int Id { get; set; }

    public int? VentaId { get; set; }

    public int? ProductoId { get; set; }

    public int? Cantidad { get; set; }

    public int? Total { get; set; }

    public virtual Ventum? Venta { get; set; }

    public virtual Imagen? Producto { get; set; }
}
