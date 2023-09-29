//using System;
//using System.Collections.Generic;

//namespace vistas_proyecto_react.Models;

//public partial class Usuario
//{
//    public int Id { get; set; }

//    public int? Rol { get; set; }

//    public string Usuario1 { get; set; } = null!;

//    public string Contrasena { get; set; } = null!;

//    public int Documento { get; set; } 

//    public virtual Rol? RolNavigation { get; set; }
//}


using System;
using System.Collections.Generic;

namespace vistas_proyecto_react.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public int? Rol { get; set; }

    public string Usuario1 { get; set; } = null!;

    public string Contrasena { get; set; } = null!;

    public int Documento { get; set; }

    public string? Estado { get; set; }

    public virtual Rol? RolNavigation { get; set; }
}