import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../assets/css/menu.css"
export function NavBar() {

    return (
        <div className="container_menu">
            <a className="tiendita" href="/inicio">Tiendita_Soft</a>
            <nav>
                <a className="nav-link" href="/dasboard"  >Dashboard</a>

                <a className="nav-link" href="/rol"   >Roles</a>

                <a className="nav-link" href="/usuario"   >Usuarios</a>

                <a className="nav-link" href="/imagen" >productos</a>

                <a className="nav-link" href="/entradas"  >Entrada</a>

                <a className="nav-link" href="/cliente"  >Cliente</a>
                
                <a className="nav-link" href="/venta"   >Ventas</a>

            </nav>
        </div>
    )
}
//export default ListadoCliente;