import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";

export function Listadocategoria() {
    const [categoria, setcategoria] = useState([]);
    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [modalVisible, setModalVisible] = useState(false);
    const [NombreC, setNombreC] = useState('');
    const [Estado, setEstado] = useState('');
    const [IdImagen, setIdImagen] = useState('');

    const mostrarcategoria = async () => {
        try {
            const response = await axios.get("/api/categoria/Lista");
            setcategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarcategoria = async (idCategoria) => {
        try {
            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
            if (response.status === 200) {
                mostrarcategoria();
                setcategoriaSeleccionado(null);
                window.location.href = "/categoria"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarcategoria();
    }, []);

    const handleEliminarClick = (categoria) => {
        setcategoriaSeleccionado(categoria);
    };

    const handleConfirmarEliminar = () => {
        if (categoriaSeleccionado) {
            eliminarcategoria(categoriaSeleccionado.idCategoria);
        }
    };

    // Paginación: Calcular el índice del primer y último cliente en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategorias = categoria.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleAgregarClick = () => {
        setModalVisible(true);
    };

    const agregarCategoria = () => {
        // Realiza las operaciones de agregar categoría aquí
        // Puedes acceder a los valores del formulario desde el estado NombreC, Estado e IdImagen
        // por ejemplo: NombreC, Estado, IdImagen

        // Luego, cierra el modal y limpia los campos del formulario
        setModalVisible(false);
        setNombreC('');
        setEstado('');
        setIdImagen('');
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
                window.location.href="/"// Eliminar el token del localStorage
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
                        <h2 className="letra">Lista de las categorias</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/categoria/guardar">Agregar</a>
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
                                    <th className="raya" scope="col">Id categoria</th>
                                    <th className="raya" scope="col">Nombre categoria</th>
                                    <th className="raya" scope="col">Estado</th>
                                    <th className="raya" scope="col">IdImagen</th>
                                    <th className="raya" scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCategorias.map((categoria) => (
                                    <tr key={categoria.idCategoria}>
                                        <td className="raya">{categoria.idCategoria}</td>
                                        <td className="raya">{categoria.nombreC}</td>
                                        <td className="raya">{categoria.estado}</td>
                                        <td className="raya">{categoria.idImagen}</td>
                                        <td className="raya corto">
                                            <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                                <BiTrash />
                                            </button>
                                            <button
                                                className="btn btn-primary espacio"
                                                onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
                                            >
                                                <BiBrush />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
                </div>

                {/* Modal para confirmar la eliminación */}
                <Modal AgregarCategoria={agregarCategoria} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </div></div>
    );
}
