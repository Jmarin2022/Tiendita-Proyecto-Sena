////import React, { useState, useEffect } from 'react';
////import 'bootstrap/dist/js/bootstrap.bundle.min.js';
////import { Modal } from "./Modal";
////import axios from 'axios';
////import { NavBar } from '../principales/navbar'
////import '../../assets/css/menu.css'
////import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
////import { BiBrush } from 'react-icons/bi';
////import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
////import { BsPerson } from 'react-icons/bs';
////import { BiSearch } from "react-icons/bi";

////import { BsTrash } from 'react-icons/bs';
////import { BsPencil } from 'react-icons/bs';
////import { AiOutlineClose } from 'react-icons/ai';
////import Footer from '../principales/footer';

////export function Listadocategoria() {
////    const [categoria, setcategoria] = useState([]);
////    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
////    const [currentPage, setCurrentPage] = useState(1);
////    const itemsPerPage = 12;
////    const [modalVisible, setModalVisible] = useState(false);
////    const [NombreC, setNombreC] = useState('');
////    const [Estado, setEstado] = useState('');
////    const [IdImagen, setIdImagen] = useState('');

////    const [searchTerm, setSearchTerm] = useState("");



////    const mostrarcategoria = async (busqueda) => {
////        try {
////            let url = "/api/categoria/Lista";
////            if (busqueda) {
////                url = `/api/categoria/Buscar?busqueda=${busqueda}`;
////            }
////            const response = await axios.get(url);
////            setcategoria(response.data);
////        } catch (error) {
////            console.error(error);
////        }
////    };

////    const handleSearchChange = (e) => {
////        const value = e.target.value;
////        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
////        mostrarcategoria(value); // Muestra los clientes según el término de búsqueda
////    };

////    const eliminarcategoria = async (idCategoria) => {
////        try {
////            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
////            if (response.status === 200) {
////                mostrarcategoria();
////                setcategoriaSeleccionado(null);
////                window.location.href = "/categoria"
////            }
////        } catch (error) {
////            console.error(error);
////        }
////    };

////    useEffect(() => {
////        mostrarcategoria(searchTerm);
////    }, [searchTerm]);

////    const handleEliminarClick = (categoria) => {
////        setcategoriaSeleccionado(categoria);
////    };

////    const handleConfirmarEliminar = () => {
////        if (categoriaSeleccionado) {
////            eliminarcategoria(categoriaSeleccionado.idCategoria);
////        }
////    };

////    // Paginación: Calcular el índice del primer y último cliente en la página actual
////    const indexOfLastItem = currentPage * itemsPerPage;
////    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
////    const currentCategorias = categoria.slice(indexOfFirstItem, indexOfLastItem);

////    const handleNextPage = () => {
////        setCurrentPage((prevPage) => prevPage + 1);
////    };

////    const handlePrevPage = () => {
////        setCurrentPage((prevPage) => prevPage - 1);
////    };

////    const handleAgregarClick = () => {
////        setModalVisible(true);
////    };

////    const agregarCategoria = () => {
////        // Realiza las operaciones de agregar categoría aquí
////        // Puedes acceder a los valores del formulario desde el estado NombreC, Estado e IdImagen
////        // por ejemplo: NombreC, Estado, IdImagen

////        // Luego, cierra el modal y limpia los campos del formulario
////        setModalVisible(false);
////        setNombreC('');
////        setEstado('');
////        setIdImagen('');
////    };

////    const [loggedIn, setLoggedIn] = useState(false);
////    const [token, setToken] = useState('');

////    const handleLogin = async (username, password) => {
////        // ... código de inicio de sesión ...
////    };

////    const handleLogout = async () => {
////        try {
////            // Realizar la solicitud al backend para cerrar sesión.
////            const response = await axios.post("/api/usuario/Cierre")

////            if (response.status === 200) {
////                console.log("Cierre de sesión exitoso");
////                setLoggedIn(false);
////                setToken('');
////                localStorage.removeItem('token');
////                window.location.href="/"// Eliminar el token del localStorage
////            } else {
////                console.log("Error al cerrar sesión");
////            }
////        } catch (error) {
////            console.log(token)
////            console.error('Error al cerrar sesión:', error);
////        }
////    };

////    return (
////        <div>
////            <NavBar />

////                <div className="card ">

////                    <div className="partedeltitulo">
////                        <h2 className="letra">Lista de Categorias</h2>

////                </div>




////                    <div className="card-body">

////                    <div className="buscardor">
////                        <form className="form-inline">
////                            <input
////                                className="form-control1 pequeño"
////                                type="search"
////                                placeholder="Buscar Cliente..."
////                                aria-label="Search"
////                                name="searchInput"
////                                value={searchTerm}
////                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
////                            />
////                            <button className="pequeno1" type="submit">
////                                <BiSearch />
////                            </button>
////                        </form>
////                    </div>

////                    <div className="btn-neon btn-agre letra2">
////                        <span id="span1"></span>
////                        <span id="span2"></span>
////                        <span id="span3"></span>
////                        <span id="span4"></span>
////                        <a href="/categoria/guardar">Agregar</a>
////                    </div>
////                        <table className="table1">
////                            <thead>
////                                <tr>

////                                    <th className="raya" scope="col">Categoria</th>
////                                    <th className="raya" scope="col">Estado</th>

////                                    <th className="raya" scope="col">Operaciones</th>
////                                </tr>
////                            </thead>
////                            <tbody>
////                                {currentCategorias.map((categoria) => (
////                                    <tr key={categoria.idCategoria}>

////                                        <td className="raya">{categoria.nombreC}</td>
////                                        <td className="raya">{categoria.estado}</td>

////                                        <td className="raya corto">
////                                            <button className="btn  espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
////                                                <BsTrash className="btn-outline-danger icon" />
////                                                <AiOutlineClose className="btn-outline-danger icon-open" />
////                                            </button>
////                                            <button
////                                                className="btn"
////                                                onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
////                                            >
////                                                <BsPencil className="iconedit" />
////                                            </button>
////                                        </td>
////                                    </tr>
////                                ))}
////                            </tbody>
////                    </table>
////                    <span className="totalregistros">
////                        Total de registros: {categoria.length}
////                    </span>

////                    </div>
////                    <div className="pagination bajar">
////                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
////                            <BiChevronLeft /> Anterior
////                        </button>
////                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
////                            Siguiente <BiChevronRight />
////                        </button>
////                </div>
////                {/* Modal para confirmar la eliminación */}
////                <Modal AgregarCategoria={agregarCategoria} modalVisible={modalVisible} setModalVisible={setModalVisible} />
////                </div>
////                <Footer />

////            </div>
////    );
////}


//import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import { Modal } from "./Modal";
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'
//import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
//import { BiBrush } from 'react-icons/bi';
//import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
//import { BsPerson } from 'react-icons/bs';
//import { BiSearch } from "react-icons/bi";

//import { BsTrash } from 'react-icons/bs';
//import { BsPencil } from 'react-icons/bs';
//import { AiOutlineClose } from 'react-icons/ai';
//import Footer from '../principales/footer';

//export function Listadocategoria() {
//    const [categoria, setcategoria] = useState([]);
//    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const itemsPerPage = 12;
//    const [modalVisible, setModalVisible] = useState(false);
//    const [NombreC, setNombreC] = useState('');
//    const [Estado, setEstado] = useState('');
//    const [IdImagen, setIdImagen] = useState('');

//    const [searchTerm, setSearchTerm] = useState("");



//    const mostrarcategoria = async (busqueda) => {
//        try {
//            let url = "/api/categoria/Lista";
//            if (busqueda) {
//                url = `/api/categoria/Buscar?busqueda=${busqueda}`;
//            }
//            const response = await axios.get(url);
//            setcategoria(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleSearchChange = (e) => {
//        const value = e.target.value;
//        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
//        mostrarcategoria(value); // Muestra los clientes según el término de búsqueda
//    };

//    const eliminarcategoria = async (idCategoria) => {
//        try {
//            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
//            if (response.status === 200) {
//                mostrarcategoria();
//                setcategoriaSeleccionado(null);
//                window.location.href = "/categoria"
//            }
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    useEffect(() => {
//        mostrarcategoria(searchTerm);
//    }, [searchTerm]);

//    const handleEliminarClick = (categoria) => {
//        setcategoriaSeleccionado(categoria);
//    };

//    const handleConfirmarEliminar = () => {
//        if (categoriaSeleccionado) {
//            eliminarcategoria(categoriaSeleccionado.idCategoria);
//        }
//    };

//    // Paginación: Calcular el índice del primer y último cliente en la página actual
//    const indexOfLastItem = currentPage * itemsPerPage;
//    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//    const currentCategorias = categoria.slice(indexOfFirstItem, indexOfLastItem);

//    const handleNextPage = () => {
//        setCurrentPage((prevPage) => prevPage + 1);
//    };

//    const handlePrevPage = () => {
//        setCurrentPage((prevPage) => prevPage - 1);
//    };

//    const handleAgregarClick = () => {
//        setModalVisible(true);
//    };

//    const agregarCategoria = () => {
//        // Realiza las operaciones de agregar categoría aquí
//        // Puedes acceder a los valores del formulario desde el estado NombreC, Estado e IdImagen
//        // por ejemplo: NombreC, Estado, IdImagen

//        // Luego, cierra el modal y limpia los campos del formulario
//        setModalVisible(false);
//        setNombreC('');
//        setEstado('');
//        setIdImagen('');
//    };

//    const [loggedIn, setLoggedIn] = useState(false);
//    const [token, setToken] = useState('');

//    const handleLogin = async (username, password) => {
//        // ... código de inicio de sesión ...
//    };

//    const handleLogout = async () => {
//        try {
//            // Realizar la solicitud al backend para cerrar sesión.
//            const response = await axios.post("/api/usuario/Cierre")

//            if (response.status === 200) {
//                console.log("Cierre de sesión exitoso");
//                setLoggedIn(false);
//                setToken('');
//                localStorage.removeItem('token');
//                window.location.href = "/"// Eliminar el token del localStorage
//            } else {
//                console.log("Error al cerrar sesión");
//            }
//        } catch (error) {
//            console.log(token)
//            console.error('Error al cerrar sesión:', error);
//        }
//    };

//    return (
//        <div>
//            <NavBar />

//            <div className="card ">

//                <div className="partedeltitulo">
//                    <h2 className="letra">Lista de Categorias</h2>

//                </div>




//                <div className="card-body">

//                    <div className="buscardor">
//                        <form className="form-inline">
//                            <input
//                                className="form-control1 pequeño"
//                                type="search"
//                                placeholder="Buscar Cliente..."
//                                aria-label="Search"
//                                name="searchInput"
//                                value={searchTerm}
//                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
//                            />
//                            <button className="pequeno1" type="submit">
//                                <BiSearch />
//                            </button>
//                        </form>
//                    </div>

//                    <div className="btn-neon btn-agre letra2">
//                        <span id="span1"></span>
//                        <span id="span2"></span>
//                        <span id="span3"></span>
//                        <span id="span4"></span>
//                        <a href="/categoria/guardar">Agregar</a>
//                    </div>
//                    <table className="table1">
//                        <thead>
//                            <tr>

//                                <th className="raya" scope="col">Categoria</th>
//                                <th className="raya" scope="col">Estado</th>

//                                <th className="raya" scope="col">Operaciones</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {currentCategorias.map((categoria) => (
//                                <tr key={categoria.idCategoria}>

//                                    <td className="raya">{categoria.nombreC}</td>
//                                    <td className="raya">{categoria.estado}</td>

//                                    <td className="raya corto">
//                                        <button className="btn  espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
//                                            <BsTrash className="btn-outline-danger icon" />
//                                            <AiOutlineClose className="btn-outline-danger icon-open" />
//                                        </button>
//                                        <button
//                                            className="btn"
//                                            onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
//                                        >
//                                            <BsPencil className="iconedit" />
//                                        </button>
//                                    </td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>
//                    <span className="totalregistros">
//                        Total de registros: {categoria.length}
//                    </span>

//                </div>
//                <div className="pagination bajar">
//                    <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//                        <BiChevronLeft /> Anterior
//                    </button>
//                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
//                        Siguiente <BiChevronRight />
//                    </button>
//                </div>
//                {/* Modal para confirmar la eliminación */}
//                <Modal AgregarCategoria={agregarCategoria} modalVisible={modalVisible} setModalVisible={setModalVisible} handleConfirmarEliminar={handleConfirmarEliminar} />
//            </div>
//            <Footer />

//        </div>
//    );
//}


//import React, { useState, useEffect } from 'react';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import { Modal } from "./Modal";
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'
//import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
//import { BiBrush } from 'react-icons/bi';
//import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
//import { BsPerson } from 'react-icons/bs';
//import { BiSearch } from "react-icons/bi";

//import { BsTrash } from 'react-icons/bs';
//import { BsPencil } from 'react-icons/bs';
//import { AiOutlineClose } from 'react-icons/ai';
//import Footer from '../principales/footer';

//export function Listadocategoria() {
//    const [categoria, setcategoria] = useState([]);
//    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const itemsPerPage = 12;
//    const [modalVisible, setModalVisible] = useState(false);
//    const [NombreC, setNombreC] = useState('');
//    const [Estado, setEstado] = useState('');
//    const [IdImagen, setIdImagen] = useState('');

//    const [searchTerm, setSearchTerm] = useState("");



//    const mostrarcategoria = async (busqueda) => {
//        try {
//            let url = "/api/categoria/Lista";
//            if (busqueda) {
//                url = `/api/categoria/Buscar?busqueda=${busqueda}`;
//            }
//            const response = await axios.get(url);
//            setcategoria(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleSearchChange = (e) => {
//        const value = e.target.value;
//        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
//        mostrarcategoria(value); // Muestra los clientes según el término de búsqueda
//    };

//    const eliminarcategoria = async (idCategoria) => {
//        try {
//            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
//            if (response.status === 200) {
//                mostrarcategoria();
//                setcategoriaSeleccionado(null);
//                window.location.href = "/categoria"
//            }
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    useEffect(() => {
//        mostrarcategoria(searchTerm);
//    }, [searchTerm]);

//    const handleEliminarClick = (categoria) => {
//        setcategoriaSeleccionado(categoria);
//    };

//    const handleConfirmarEliminar = () => {
//        if (categoriaSeleccionado) {
//            eliminarcategoria(categoriaSeleccionado.idCategoria);
//        }
//    };

//    // Paginación: Calcular el índice del primer y último cliente en la página actual
//    const indexOfLastItem = currentPage * itemsPerPage;
//    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//    const currentCategorias = categoria.slice(indexOfFirstItem, indexOfLastItem);

//    const handleNextPage = () => {
//        setCurrentPage((prevPage) => prevPage + 1);
//    };

//    const handlePrevPage = () => {
//        setCurrentPage((prevPage) => prevPage - 1);
//    };

//    const handleAgregarClick = () => {
//        setModalVisible(true);
//    };

//    const agregarCategoria = () => {
//        // Realiza las operaciones de agregar categoría aquí
//        // Puedes acceder a los valores del formulario desde el estado NombreC, Estado e IdImagen
//        // por ejemplo: NombreC, Estado, IdImagen

//        // Luego, cierra el modal y limpia los campos del formulario
//        setModalVisible(false);
//        setNombreC('');
//        setEstado('');
//        setIdImagen('');
//    };

//    const [loggedIn, setLoggedIn] = useState(false);
//    const [token, setToken] = useState('');

//    const handleLogin = async (username, password) => {
//        // ... código de inicio de sesión ...
//    };

//    const handleLogout = async () => {
//        try {
//            // Realizar la solicitud al backend para cerrar sesión.
//            const response = await axios.post("/api/usuario/Cierre")

//            if (response.status === 200) {
//                console.log("Cierre de sesión exitoso");
//                setLoggedIn(false);
//                setToken('');
//                localStorage.removeItem('token');
//                window.location.href="/"// Eliminar el token del localStorage
//            } else {
//                console.log("Error al cerrar sesión");
//            }
//        } catch (error) {
//            console.log(token)
//            console.error('Error al cerrar sesión:', error);
//        }
//    };

//    return (
//        <div>
//            <NavBar />

//                <div className="card ">

//                    <div className="partedeltitulo">
//                        <h2 className="letra">Lista de Categorias</h2>

//                </div>




//                    <div className="card-body">

//                    <div className="buscardor">
//                        <form className="form-inline">
//                            <input
//                                className="form-control1 pequeño"
//                                type="search"
//                                placeholder="Buscar Cliente..."
//                                aria-label="Search"
//                                name="searchInput"
//                                value={searchTerm}
//                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
//                            />
//                            <button className="pequeno1" type="submit">
//                                <BiSearch />
//                            </button>
//                        </form>
//                    </div>

//                    <div className="btn-neon btn-agre letra2">
//                        <span id="span1"></span>
//                        <span id="span2"></span>
//                        <span id="span3"></span>
//                        <span id="span4"></span>
//                        <a href="/categoria/guardar">Agregar</a>
//                    </div>
//                        <table className="table1">
//                            <thead>
//                                <tr>

//                                    <th className="raya" scope="col">Categoria</th>
//                                    <th className="raya" scope="col">Estado</th>

//                                    <th className="raya" scope="col">Operaciones</th>
//                                </tr>
//                            </thead>
//                            <tbody>
//                                {currentCategorias.map((categoria) => (
//                                    <tr key={categoria.idCategoria}>

//                                        <td className="raya">{categoria.nombreC}</td>
//                                        <td className="raya">{categoria.estado}</td>

//                                        <td className="raya corto">
//                                            <button className="btn  espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
//                                                <BsTrash className="btn-outline-danger icon" />
//                                                <AiOutlineClose className="btn-outline-danger icon-open" />
//                                            </button>
//                                            <button
//                                                className="btn"
//                                                onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
//                                            >
//                                                <BsPencil className="iconedit" />
//                                            </button>
//                                        </td>
//                                    </tr>
//                                ))}
//                            </tbody>
//                    </table>
//                    <span className="totalregistros">
//                        Total de registros: {categoria.length}
//                    </span>

//                    </div>
//                    <div className="pagination bajar">
//                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//                            <BiChevronLeft /> Anterior
//                        </button>
//                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
//                            Siguiente <BiChevronRight />
//                        </button>
//                </div>
//                {/* Modal para confirmar la eliminación */}
//                <Modal AgregarCategoria={agregarCategoria} modalVisible={modalVisible} setModalVisible={setModalVisible} />
//                </div>
//                <Footer />

//            </div>
//    );
//}


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
import Swal from 'sweetalert2';
import ReactSwitch from 'react-switch';

import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Footer from '../principales/footer';

export function Listadocategoria() {
    const [categoria, setcategoria] = useState([]);
    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [modalVisible, setModalVisible] = useState(false);
    const [NombreC, setNombreC] = useState('');
    const [Estado, setEstado] = useState('');
    const [IdImagen, setIdImagen] = useState('');

    const [searchTerm, setSearchTerm] = useState("");
    const [filtroActivo, setFiltroActivo] = useState('todos'); // Estado para el filtro








    const mostrarcategoria = async (busqueda, filtro) => {
        try {
            let url = "/api/categoria/Lista";
            if (busqueda) {
                url = `/api/categoria/Buscar?busqueda=${busqueda}`;
            }

            if (filtro === 'activos') {
                url = '/api/categoria/FiltrarActivos';
                console.log('hola1')
            } else if (filtro === 'inactivos') {
                url = '/api/categoria/FiltrarInactivos';
                console.log('hola2')
            }
            const response = await axios.get(url);
            setcategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
        mostrarcategoria(value); // Muestra los clientes según el término de búsqueda
    };

    const eliminarcategoria = async (idCategoria) => {
        try {
            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
            if (response.status === 200) {
                mostrarcategoria('', filtroActivo); // Usar el filtro actual
                setcategoriaSeleccionado(null);
                window.location.href = "/categoria"
            }
        } catch (error) {
            console.error(error);
        }
    };

    //useEffect(() => {
    //    mostrarcategoria(searchTerm);
    //}, [searchTerm]);


    useEffect(() => {
        const fetchData = async () => {
            if (filtroActivo !== '') {
                mostrarcategoria('', filtroActivo); // Incluye el filtro de StockMin al buscar imágenes
            } else {
                mostrarcategoria(searchTerm, filtroActivo); // Incluye el filtro de StockMin al buscar imágenes
            }
        };

        mostrarcategoria(searchTerm); // Llamar a mostrarcategoria cuando searchTerm cambie
        fetchData(); // Llamar a fetchData cuando filtroActivo cambie
    }, [searchTerm, filtroActivo]);


   



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
                window.location.href = "/"// Eliminar el token del localStorage
            } else {
                console.log("Error al cerrar sesión");
            }
        } catch (error) {
            console.log(token)
            console.error('Error al cerrar sesión:', error);
        }
    };


    const handleToggleEstado = async (IdCategoria) => {
        const confirmacion = await Swal.fire({
            title: '&#191;Est&#225;s seguro?',
            title: '&#191;Quieres cambiar el estado de esta categor&#237;a?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&#237;',
            cancelButtonText: 'No',
        });

        if (confirmacion.isConfirmed) {
            const imagenSeleccionada = categoria.find((categoria) => categoria.idCategoria === IdCategoria);

            if (!imagenSeleccionada) {
                return;
            }

            // Cambia el estado local del producto (Activo o Inactivo)
            const nuevoEstado = imagenSeleccionada.estado === 'Activo' ? 'Inactivo' : 'Activo';
            imagenSeleccionada.estado = nuevoEstado;

            // Actualiza la lista local de productos
            const nuevaLista = [...categoria];
            setcategoria(nuevaLista);

            try {
                // Envía la solicitud al servidor para actualizar el estado
                const response = await axios.put(`/api/categoria/ToggleEstado/${IdCategoria}`);
                if (response.status === 200) {
                    // Muestra una alerta de SweetAlert con un mensaje según el estado
                    Swal.fire({
                        icon: 'success',
                        title: `Producto ${nuevoEstado}`,
                        text: `El producto se ha marcado como ${nuevoEstado}.`,
                        timer: 2000, // Cerrar automáticamente después de 2 segundos
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleToggleFiltro = (filtro) => {
        let nuevoFiltro = '';
        if (filtro === filtroActivo) {
            nuevoFiltro = ''; // Desactiva el filtro si se hace clic en el filtro activo
        } else {
            nuevoFiltro = filtro; // Activa el filtro si se hace clic en otro filtro
        }

        setFiltroActivo(nuevoFiltro); // Actualiza el estado de filtro

        // Llama a mostrarUsuarios con el nuevo filtro
        mostrarcategoria(searchTerm, nuevoFiltro);
    };

    return (
        <div>
            <NavBar />

            <div className="card ">

                <div className="partedeltitulo">
                    <h2 className="letra">Lista de Categor&#237;as</h2>

                </div>




                <div className="card-body">

                    <div className="buscardor">
                        <form className="form-inline">
                            <input
                                className="form-control1 pequeño"
                                type="search"
                                placeholder="Buscar Categor&#237;a..."
                                aria-label="Search"
                                name="searchInput"
                                value={searchTerm}
                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
                            />
                            <button className="pequeno1" type="submit">
                                <BiSearch />
                            </button>
                        </form>
                    </div>

                    <div className="filtro-estado">
                        <label className="mx-2">Filtrar por estado:  </label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="todos"
                                value="todos"
                                checked={filtroActivo === 'todos'}
                                onChange={() => handleToggleFiltro('todos')}
                            />
                            <label className="form-check-label" htmlFor="todos">
                                Todos
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="activos"
                                value="activos"
                                checked={filtroActivo === 'activos'}
                                onChange={() => handleToggleFiltro('activos')}
                            />
                            <label className="form-check-label" htmlFor="activos">
                                Activos
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="inactivos"
                                value="inactivos"
                                checked={filtroActivo === 'inactivos'}
                                onChange={() => handleToggleFiltro('inactivos')}
                            />
                            <label className="form-check-label" htmlFor="inactivos">
                                Inactivos
                            </label>
                        </div>
                        </div>

                    <div className="btn-neon btn-agre letra2">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/categoria/guardar">Agregar</a>
                    </div>
                    <table className="table1">
                        <thead>
                            <tr>

                                <th className="raya" scope="col">Categoria</th>
                                <th className="raya" scope="col">Estado</th>

                                <th className="raya" scope="col">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategorias.map((categoria) => (
                                <tr key={categoria.idCategoria}>

                                    <td className="raya">{categoria.nombreC}</td>
                                    <td className="raya">
                                        {categoria.estado}
                                        <ReactSwitch
                                            className="mx-2"
                                            checked={categoria.estado === 'Activo'}
                                            onChange={() => handleToggleEstado(categoria.idCategoria)}
                                            width={40}
                                            height={18}
                                            handleDiameter={10}
                                            onColor="#007bff"
                                            offColor="#000"
                                            uncheckedIcon={false}
                                        />
                                    </td>

                                    <td className="raya corto">
                                        <button className="btn  espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BsTrash className="btn-outline-danger icon" />
                                            <AiOutlineClose className="btn-outline-danger icon-open" />
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
                                        >
                                            <BsPencil className="iconedit" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span className="totalregistros">
                        Total de registros: {categoria.length}
                    </span>

                </div>
                <div className="pagination bajar">
                    <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <BiChevronLeft /> Anterior
                    </button>
                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
                        Siguiente <BiChevronRight />
                    </button>
                </div>
                {/* Modal para confirmar la eliminación */}
                <Modal AgregarCategoria={agregarCategoria} modalVisible={modalVisible} setModalVisible={setModalVisible} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
            <Footer />

        </div>
    );
}
