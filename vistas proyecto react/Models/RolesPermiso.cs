using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class RolesPermiso
{
    public int IdRolPermisos { get; set; }

    public int? IdRol { get; set; }

    public int? IdPermisos { get; set; }

    public virtual Permiso? IdPermisosNavigation { get; set; }

    public virtual Rol? IdRolNavigation { get; set; }
}
