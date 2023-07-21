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
            
            <div className="nav1 ">
                <div className="nav-link1 bajar2">
                </div>
                <Link to="/" className="nav-link1">
                    <BsCardText /> Dashboard
                </Link>
                <Link to="/rol" className="nav-link1">
                    <BsPerson /> Rol
                </Link>
                <Link to="/usuario" className="nav-link1">
                    <BsPerson /> Usuarios
                </Link>
                <Link to="/imagen" className="nav-link1">
                    <BsShop /> Productos
                </Link>
                <Link to="/entradas" className="nav-link1">
                    <BiPlus /> Entrada
                </Link>

                <Link to="/cliente" className="nav-link1">
                    <BsPerson /> Cliente
                </Link>

                <Link to="/venta" className="nav-link1">
                    <BiCart /> Ventas
                </Link>


            </div>
        </div>
    )
}
//export default ListadoCliente;