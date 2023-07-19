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

export function ListadoRol() {
    const [rol, setRol] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPorPagina = 5;

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

    return (
        <div>
            <NavBar />
            <div className="contenido1">
                <div className="Titulo">
                    <a href="/permiso" className="letra btn-neon">Permisos</a>
                    <h2 className="letra">Lista de los roles</h2>
                    <div className="btn-neon">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/Rol/guardar">Agregar</a>
                    </div>
                </div>

                <div className="container2">
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
                    <div className="pagination">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={rolesPaginados.length < rolesPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
