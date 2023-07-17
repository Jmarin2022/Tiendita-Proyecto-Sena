using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Ventum
{
    public int Id { get; set; }

    public string? Cliente { get; set; }

    public DateTime? Fechaventa { get; set; }

    public int? Total { get; set; }

    public virtual ICollection<DetalleVenta> DetalleVenta { get; set; } = new List<DetalleVenta>();
}
