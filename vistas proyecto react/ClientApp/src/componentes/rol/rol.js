import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";
export function ListadoRol() {
    const [rol, setRol] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPorPagina = 12;

    const mostrarRol = async () => {
        try {
            const response = await axios.get("/api/rol/Lista");
            setRol(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarRol = async (IdRol) => {
        try {
            const response = await axios.delete(`/api/rol/Eliminar/${IdRol}`);
            if (response.status === 200) {
                mostrarRol();
                setRolSeleccionado(null);
                window.location.href = "/rol";
            }
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString).toLocaleDateString("es-PE", options);
        const time = new Date(dateString).toLocaleTimeString();
        return `${date} | ${time}`;
    };

    useEffect(() => {
        mostrarRol();
    }, []);

    const handleEliminarClick = (rol) => {
        setRolSeleccionado(rol);
    };

    const handleConfirmarEliminar = () => {
        if (rolSeleccionado) {
            eliminarRol(rolSeleccionado.idRol);
        }
    };

    const indexOfLastRol = currentPage * rolesPorPagina;
    const indexOfFirstRol = indexOfLastRol - rolesPorPagina;
    const rolesPaginados = rol.slice(indexOfFirstRol, indexOfLastRol);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    const handleLogin = async (username, password) => {
        // ... código de inicio de sesión ...
    };

    const handleLogout = async () => {
        try {
            // Realizar la solicitud al backend para cerrar sesión.
            const response = await axios.post("/api/usuario/Cierre")

            if (response.status === 200) {
                console.log("Cierre de sesión exitoso");
                setLoggedIn(false);
                setToken('');
                localStorage.removeItem('token');
                window.location.href = "/"// Eliminar el token del localStorage
            } else {
                console.log("Error al cerrar sesión");
            }
        } catch (error) {
            console.log(token)
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    {loggedIn ? (
                        <div className="card-header1">
                            <div className="Titulo12">
                                <h2 className="letra12">Juan <BsPerson /></h2>
                            </div>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    ) : (
                        <div className="card-header1">
                            <div className="Titulo12">
                                <h2 className="letra12">Juan <BsPerson /></h2>
                            </div>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    )}
                    <div className="partedeltitulo">
                        <h2 className="letra">Lista de los roles</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/rol/guardar">Agregar</a>
                        </div>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control1 pequeño" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-primary pequeño1" type="submit">
                            <BiSearch />
                        </button>
                    </form>
                    <div className="card-body">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Id Rol</th>
                                <th scope="col" className="raya">Rol1</th>
                                <th scope="col" className="raya">Fecha</th>
                                <th scope="col" className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolesPaginados.map((rol) => (
                                <tr key={rol.IdRol}>
                                    <td className="raya">{rol.idRol}</td>
                                    <td className="raya">{rol.rol1}</td>
                                    <td className="raya">{formatDate(rol.fecha)}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(rol)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/rol/editar/${rol.idRol}`; }}>
                                            <BiBrush />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    </div>
                    <Modal rolSeleccionado={rolSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={rolesPaginados.length < rolesPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
        </div></div>
    );
}
