import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../assets/css/menu.css"
import "../../assets/css/bootstrap/dist/css/bootstrap.min.css"
import { BsCardText } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';

export function NavBar() {

    return (
        <div className="container_menu">
            <div className="titulologo">
                <a className="tiendita" href="/">Tiendita_Soft</a>
            </div>
            <div className="menu-nav">
                <nav>
                    <Link to="/" className="nav-link">
                        <BsCardText /> Dashboard
                    </Link>
                    <Link to="/rol" className="nav-link">
                        <BsPerson /> Rol
                    </Link>
                    <Link to="/usuario" className="nav-link">
                        <BsPerson /> Usuarios
                    </Link>
                    <Link to="/imagen" className="nav-link">
                        <BsShop /> Productos
                    </Link>
                    <Link to="/entradas" className="nav-link">
                        <BiPlus /> Entrada
                    </Link>
                    <Link to="/categoria" className="nav-link">
                        <BsCardText /> Categorias
                    </Link>
                    <Link to="/venta" className="nav-link">
                        <BiCart /> Ventas
                    </Link>
                    <Link to="/cliente" className="nav-link">
                        <BsPerson /> Cliente
                    </Link>
                </nav>
            </div>
        </div>
    )
}
//export default ListadoCliente;