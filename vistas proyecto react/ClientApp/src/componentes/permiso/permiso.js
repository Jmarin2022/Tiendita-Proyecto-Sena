//import { useEffect, useState } from 'react';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import { Modal } from "./Modal";
//import axios from 'axios';
//import { Link } from 'react-router-dom';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'
//import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
//import { BiBrush } from 'react-icons/bi';
//import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas

//export function Listadopermiso() {
//    const [permiso, setpermiso] = useState([]);
//    const [permisosSeleccionado, setpermisosSeleccionado] = useState(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const permisosPorPagina = 12;

//    const mostrarpermiso = async () => {
//        try {
//            const response = await axios.get("/api/permiso/Lista");
//            setpermiso(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const eliminarpermiso = async (IdPermisos) => {
//        try {
//            const response = await axios.delete(`/api/permiso/Eliminar/${IdPermisos}`);
//            if (response.status === 200) {
//                mostrarpermiso();
//                setpermisosSeleccionado(null);
//                window.location.href = "/permiso";
//            }
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    useEffect(() => {
//        mostrarpermiso();
//    }, []);

//    const handleEliminarClick = (permiso) => {
//        setpermisosSeleccionado(permiso);
//    };

//    const handleConfirmarEliminar = () => {
//        if (permisosSeleccionado) {
//            eliminarpermiso(permisosSeleccionado.idPermisos);
//        }
//    };

//    const indexOfLastPermiso = currentPage * permisosPorPagina;
//    const indexOfFirstPermiso = indexOfLastPermiso - permisosPorPagina;
//    const permisosPaginados = permiso.slice(indexOfFirstPermiso, indexOfLastPermiso);

//    const handleNextPage = () => {
//        setCurrentPage(currentPage + 1);
//    };

//    const handlePrevPage = () => {
//        setCurrentPage(currentPage - 1);
//    };

//    return (
//        <div>
//            <NavBar />
//            <div className="margin0">
//                <div className="card ">
//                    <div className="card-header1">
//                <div className="Titulo1">
//                    <h2 className="letra">Lista de los permisos</h2>
//                    <div className="btn-neon">
//                        <span id="span1"></span>
//                        <span id="span2"></span>
//                        <span id="span3"></span>
//                        <span id="span4"></span>
//                        <a href="/permiso/guardar">Agregar</a>
//                    </div>
//                </div></div>

//                    <div className="card-body">
//                    <table className="table1">
//                        <thead>
//                            <tr>
//                                <th scope="col" className="raya">Id permiso</th>
//                                <th scope="col" className="raya">Modulo</th>
//                                <th scope="col" className="raya">Crear</th>
//                                <th scope="col" className="raya">Eliminar</th>
//                                <th scope="col" className="raya">Editar</th>
//                                <th scope="col" className="raya">Operaciones</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {permisosPaginados.map((permiso) => (
//                                <tr key={permiso.IdPermisos}>
//                                    <td className="raya">{permiso.idPermisos}</td>
//                                    <td className="raya">{permiso.modulo}</td>
//                                    <td className="raya">{permiso.crear}</td>
//                                    <td className="raya">{permiso.eliminar}</td>
//                                    <td className="raya">{permiso.editar}</td>
//                                    <td className="raya corto">
//                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(permiso)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
//                                            <BiTrash />
//                                        </button>
//                                        <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/permiso/editar/${permiso.idPermisos}`; }}>
//                                            <BiBrush />
//                                        </button>
//                                    </td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>

//                    </div>
//                    <Modal permisosSeleccionado={permisosSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
//                    <div className="pagination bajar">
//                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//                            <BiChevronLeft /> Anterior
//                        </button>
//                        <button className="btn btn-primary" onClick={handleNextPage} disabled={permisosPaginados.length < permisosPorPagina}>
//                            Siguiente <BiChevronRight />
//                        </button>
//                    </div>
//            </div>
//        </div></div>
//    );
//}
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi';
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

export function Listadopermiso() {
    const [permiso, setpermiso] = useState([]);
    const [permisosSeleccionado, setpermisosSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const permisosPorPagina = 12;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPermisos, setFilteredPermisos] = useState([]);

    const mostrarpermiso = async () => {
        try {
            const response = await axios.get("/api/permiso/Lista");
            setpermiso(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarpermiso = async (IdPermisos) => {
        try {
            const response = await axios.delete(`/api/permiso/Eliminar/${IdPermisos}`);
            if (response.status === 200) {
                mostrarpermiso();
                setpermisosSeleccionado(null);
                window.location.href = "/permiso";
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarpermiso();
    }, []);

    useEffect(() => {
        const filtered = permiso.filter(permiso =>
            permiso.modulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPermisos(filtered);
    }, [permiso, searchTerm]);

    const handleEliminarClick = (permiso) => {
        setpermisosSeleccionado(permiso);
    };

    const handleConfirmarEliminar = () => {
        if (permisosSeleccionado) {
            eliminarpermiso(permisosSeleccionado.idPermisos);
        }
    };

    const indexOfLastPermiso = currentPage * permisosPorPagina;
    const indexOfFirstPermiso = indexOfLastPermiso - permisosPorPagina;
    const permisosPaginados = filteredPermisos.slice(indexOfFirstPermiso, indexOfLastPermiso);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                        <div className="Titulo1">
                            <h2 className="letra">Lista de los permisos</h2>
                            <div className="btn-neon">
                                <span id="span1"></span>
                                <span id="span2"></span>
                                <span id="span3"></span>
                                <span id="span4"></span>
                                <a href="/permiso/guardar">Agregar</a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <table className="table1">
                            <thead>
                                <tr>
                                    <th scope="col" className="raya">Id permiso</th>
                                    <th scope="col" className="raya">Modulo</th>
                                    <th scope="col" className="raya">Crear</th>
                                    <th scope="col" className="raya">Eliminar</th>
                                    <th scope="col" className="raya">Editar</th>
                                    <th scope="col" className="raya">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permisosPaginados.map((permiso) => (
                                    <tr key={permiso.IdPermisos}>
                                        <td className="raya">{permiso.idPermisos}</td>
                                        <td className="raya">{permiso.modulo}</td>
                                        <td className="raya">{permiso.crear}</td>
                                        <td className="raya">{permiso.eliminar}</td>
                                        <td className="raya">{permiso.editar}</td>
                                        <td className="raya corto">
                                            <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(permiso)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                                <BiTrash />
                                            </button>
                                            <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/permiso/editar/${permiso.idPermisos}`; }}>
                                                <BiBrush />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal permisosSeleccionado={permisosSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={permisosPaginados.length < permisosPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


