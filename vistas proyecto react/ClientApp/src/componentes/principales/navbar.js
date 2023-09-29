import { Link, useLocation } from "react-router-dom";
import { BsCardText } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import "../../assets/css/menu.css";
import { useUserContext } from "../principales/UserContext";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FcComboChart } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { IoMdCube } from "react-icons/io";
import axios from "axios";
import { FaTag } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

export function NavBar() {
    const [nombreUsuario, setNombreUsuario] = useState([]);

    const { userPayload, setUserPayload } = useUserContext();

    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú

    if (userPayload == null) {
        window.location.href = "/login";
    }

    const id = userPayload.nameid;

    useEffect(() => {
        axios.get(`/api/usuario/Detalles/${id}`).then((res) => {
            console.log("hola");
            setNombreUsuario(res.data);
        });
    }, []);

    const handleLogout = () => {
        // Elimina el userPayload del contexto
        setUserPayload(null);

        // Borra el valor almacenado en el localStorage
        localStorage.removeItem("userPayload");

        // Redirige a la página de inicio de sesión
        window.location.href = "/login";
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <div className="container_menu">
                <div className="menu-nav">
                    <nav>
                        <div className="titulologo">
                            <img
                                className=""
                                src={require("./img/Logo2.png")}
                                alt=""
                                width="40"
                            />
                            <a className="tiendita">Tiendita_Soft</a>
                        </div>

                        {/* Enlace "Dashboard" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/Dasboard" className="nav-link">
                                <FcComboChart size={18} style={{ marginRight: "10px" }} />{" "}
                                Dashboard
                            </Link>
                        )}

                        {/* Enlace "Rol" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/rol" className="nav-link">
                                <FaUser size={18} style={{ marginRight: "10px" }} /> Rol
                            </Link>
                        )}

                        {/* Enlace "Usuarios" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/usuario" className="nav-link">
                                <BsPerson size={18} style={{ marginRight: "10px" }} /> Usuarios
                            </Link>
                        )}

                        {/* Enlace "Categorias" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/categoria" className="nav-link">
                                <FaTag size={18} style={{ marginRight: "10px" }} /> Categorías
                            </Link>
                        )}

                        {/* Enlace "Productos" solo para el rol "Administrador" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/imagen" className="nav-link">
                                <IoMdCube size={18} style={{ marginRight: "10px" }} /> Productos
                            </Link>
                        )}

                        {/* Enlace "Ventas" */}
                        {userPayload.role === "Administrador" && (
                            <Link to="/venta" className="nav-link">
                                <BiCart size={18} style={{ marginRight: "10px" }} /> Ventas
                            </Link>
                        )}

                        {/* Enlace "Usuarios" */}
                        {/*{userPayload.role === "Administrador" && (*/}
                        {/*    <Link to="/cliente" className="nav-link">*/}
                        {/*        <BsPerson /> Cliente*/}
                        {/*    </Link>*/}
                        {/*)}*/}

                        {userPayload.role === "Cliente" && (
                            <Link to="/imagen" className="nav-link">
                                <i className="material-icons">Productos</i>
                            </Link>
                        )}

                        {userPayload.role === "Administrador" && (
                            <Link to="/entradas" className="nav-link">
                                <BsShop size={18} style={{ marginRight: "10px" }} /> Entradas

                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Bloque de usuario */}
            <div className="user">
                <div className="card-header1">
                    <div className="Titulo12">
                        <h2 className="letra12 text-white">
                            <BsPerson size={30} style={{ color: "white" }} />{" "}
                            {nombreUsuario.usuario1}
                        </h2>

                        {/* Botón de cierre de sesión */}
                        {/* Botón de cierre de sesión */}
                        <div className="user-menu">
                            <div className="menu-container">
                                <button className="botondecerrar" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    <FiLogOut className="cerrar-sesion-icon" />
                                </button>
                                {isMenuOpen && (
                                    <div className="menu-dropdown">
                                        <button className="menu-option" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                        <button
                                            className="menu-option"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}