using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Permiso
{
    public int IdPermisos { get; set; }

    public string? Crear { get; set; }

    public string? Eliminar { get; set; }

    public string? Editar { get; set; }

    public string? Modulo { get; set; }

    public virtual ICollection<RolesPermiso> RolesPermisos { get; set; } = new List<RolesPermiso>();
}
