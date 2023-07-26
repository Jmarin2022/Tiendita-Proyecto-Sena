import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";

export function Listadoentradum() {
    const [entradums, setentradums] = useState([]);
    const [entradumSeleccionado, setentradumSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const entradasPorPagina = 12;

    const mostrarentradums = async () => {
        try {
            const response = await axios.get("/api/entradum/Lista");
            setentradums(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarentradum = async (idEntrada) => {
        try {
            const response = await axios.delete(`/api/entradum/Eliminar/${idEntrada}`);
            if (response.status === 200) {
                mostrarentradums();
                setentradumSeleccionado(null);
                window.location.href = "/entradas";
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarentradums();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString).toLocaleDateString("es-PE", options);
        const time = new Date(dateString).toLocaleTimeString();
        return `${date} | ${time}`;
    };

    const handleEliminarClick = (entradum) => {
        setentradumSeleccionado(entradum);
    };

    const handleConfirmarEliminar = () => {
        if (entradumSeleccionado) {
            eliminarentradum(entradumSeleccionado.idEntrada);
        }
    };

    const indexOfLastEntrada = currentPage * entradasPorPagina;
    const indexOfFirstEntrada = indexOfLastEntrada - entradasPorPagina;
    const entradasPaginadas = entradums.slice(indexOfFirstEntrada, indexOfLastEntrada);

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
                        <h2 className="letra">Lista de las entradas</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/entrada/guardar">Agregar</a>
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
                                <th scope="col " className="raya">Id entradum</th>
                                <th scope="col " className="raya">id del producto</th>
                                <th scope="col " className="raya">Catidad</th>
                                <th scope="col " className="raya">Proveedor</th>
                                <th scope="col " className="raya">Fecha Registro</th>
                                <th scope="col " className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradasPaginadas.map((entradum) => (
                                <tr key={entradum.IdEntrada}>
                                    <td className="raya">{entradum.idEntrada}</td>
                                    <td className="raya">{entradum.idProductos}</td>
                                    <td className="raya">{entradum.cantidad}</td>
                                    <td className="raya">{entradum.proveedor}</td>
                                    <td className="raya">{formatDate(entradum.fecha)}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(entradum)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/entradas/editar/${entradum.idEntrada}`; }}>
                                            <BiBrush />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Modal para confirmar la eliminación */}
                    <Modal entradumSeleccionado={entradumSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                </div>
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={entradasPaginadas.length < entradasPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
        </div></div>
    );
}
