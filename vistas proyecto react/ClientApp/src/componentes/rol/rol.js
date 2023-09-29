


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
//import { BsPerson } from 'react-icons/bs';
//import { BiSearch } from "react-icons/bi";

//import { BsTrash } from 'react-icons/bs';
//import { BsPencil } from 'react-icons/bs';
//import { AiOutlineClose } from 'react-icons/ai';
//import Footer from '../principales/footer';

//import Swal from 'sweetalert2';
//import ReactSwitch from 'react-switch';

//export function ListadoRol() {
//    const [rol, setRol] = useState([]);
//    const [rolSeleccionado, setRolSeleccionado] = useState(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const rolesPorPagina = 12;

//    //const mostrarRol = async () => {
//    //    try {
//    //        const response = await axios.get("/api/rol/Lista");
//    //        setRol(response.data);
//    //    } catch (error) {
//    //        console.error(error);
//    //    }
//    //};


//    const mostrarRol = async (busqueda) => {
//        try {
//            let url = "/api/rol/Lista";
//            if (busqueda) {
//                url = `/api/rol/Buscar?busqueda=${busqueda}`;
//            }
//            const response = await axios.get(url);
//            setRol(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleSearchSubmit = (e) => {
//        e.preventDefault();
//        const searchValue = e.target.elements.searchInput.value;
//        mostrarRol(searchValue);
//    };

//    const eliminarRol = async (IdRol) => {
//        try {
//            const response = await axios.delete(`/api/rol/Eliminar/${IdRol}`);
//            if (response.status === 200) {
//                mostrarRol();
//                setRolSeleccionado(null);
//                window.location.href = "/rol";
//            }
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const formatDate = (dateString) => {
//        const options = { year: 'numeric', month: 'long', day: 'numeric' };
//        const date = new Date(dateString).toLocaleDateString("es-PE", options);
//        const time = new Date(dateString).toLocaleTimeString();
//        return `${date} | ${time}`;
//    };

//    useEffect(() => {
//        mostrarRol();
//    }, []);

//    const handleEliminarClick = (rol) => {
//        setRolSeleccionado(rol);
//    };

//    const handleConfirmarEliminar = () => {
//        if (rolSeleccionado) {
//            eliminarRol(rolSeleccionado.idRol);
//        }
//    };

//    const indexOfLastRol = currentPage * rolesPorPagina;
//    const indexOfFirstRol = indexOfLastRol - rolesPorPagina;
//    const rolesPaginados = rol.slice(indexOfFirstRol, indexOfLastRol);

//    const handleNextPage = () => {
//        setCurrentPage(currentPage + 1);
//    };

//    const handlePrevPage = () => {
//        setCurrentPage(currentPage - 1);
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

//    const handleToggleEstado = async (IdRol) => {
//        const confirmacion = await Swal.fire({
//            title: '¿Estás seguro?',
//            text: '¿Quieres cambiar el estado de este usuario?',
//            icon: 'warning',
//            showCancelButton: true,
//            confirmButtonText: 'Sí',
//            cancelButtonText: 'No',
//        });

//        if (confirmacion.isConfirmed) {
//            const imagenSeleccionada = rol.find((rol) => rol.idRol === IdRol);

//            if (!imagenSeleccionada) {
//                return;
//            }

//            // Cambia el estado local del producto (Activo o Inactivo)
//            const nuevoEstado = imagenSeleccionada.estado === 'Activo' ? 'Inactivo' : 'Activo';
//            imagenSeleccionada.estado = nuevoEstado;

//            // Actualiza la lista local de productos
//            const nuevaLista = [...rol];
//            setRol(nuevaLista);

//            try {
//                // Envía la solicitud al servidor para actualizar el estado
//                const response = await axios.put(`/api/rol/ToggleEstado/${IdRol}`);
//                if (response.status === 200) {
//                    // Muestra una alerta de SweetAlert con un mensaje según el estado
//                    Swal.fire({
//                        icon: 'success',
//                        title: `Producto ${nuevoEstado}`,
//                        text: `El producto se ha marcado como ${nuevoEstado}.`,
//                        timer: 2000, // Cerrar automáticamente después de 2 segundos
//                        showConfirmButton: false,
//                    });
//                }
//            } catch (error) {
//                console.error(error);
//            }
//        }
//    };

//    return (

//        <div>
//            <NavBar />

//            <div className="card ">

//                <div className="partedeltitulo">
//                    <h2 className="letra">Lista de roles</h2>
//                </div>
//                <div className="card-body">
//                    <table className="table1 my-5">
//                        <thead>
//                            <tr>
//                                <th scope="col" className="raya">Rol</th>
//                                <th scope="col" className="raya">Estado</th>
//                                <th scope="col" className="raya">Fecha</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {rolesPaginados.map((rol) => (
//                                <tr key={rol.IdRol}>
//                                    <td className="raya">{rol.rol1}</td>
//                                    <td className="raya">
//                                        {rol.estado}
//                                        <ReactSwitch
//                                            className="mx-2"
//                                            checked={rol.estado === 'Activo'}
//                                            onChange={() => handleToggleEstado(rol.idRol)}
//                                            width={40}
//                                            height={18}
//                                            handleDiameter={10}
//                                            onColor="#007bff"
//                                            offColor="#000"
//                                            uncheckedIcon={false}
//                                        />
//                                    </td>
//                                    <td className="raya">{formatDate(rol.fecha)}</td>
//                                </tr>
//                            ))}
//                        </tbody>
//                    </table>
//                </div>
//                <div className="pagination bajar">
//                    <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//                        <BiChevronLeft /> Anterior
//                    </button>
//                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={rolesPaginados.length < rolesPorPagina}>
//                        Siguiente <BiChevronRight />
//                    </button>
//                </div>
//                <Modal rolSeleccionado={rolSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
//            </div>

//            <Footer />
//        </div>
//    );
//}





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

import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Footer from '../principales/footer';

import Swal from 'sweetalert2';
import ReactSwitch from 'react-switch';

export function ListadoRol() {
    const [rol, setRol] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPorPagina = 12;

    

    //const mostrarRol = async () => {
    //    try {
    //        const response = await axios.get("/api/rol/Lista");
    //        setRol(response.data);
    //    } catch (error) {
    //        console.error(error);
    //    }
    //};


    const mostrarRol = async (busqueda, filtro) => {
        try {
            let url = "/api/rol/Lista";
            if (busqueda) {
                url = `/api/rol/Buscar?busqueda=${busqueda}`;
            }
            const response = await axios.get(url);
            setRol(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        mostrarRol(searchValue);
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

    const handleToggleEstado = async (IdRol) => {
        const confirmacion = await Swal.fire({
            title: '&#191;Est&#225;s seguro?',
            title: '&#191;Quieres cambiar el estado de este usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&#237;',
            cancelButtonText: 'No',
        });

        if (confirmacion.isConfirmed) {
            const imagenSeleccionada = rol.find((rol) => rol.idRol === IdRol);

            if (!imagenSeleccionada) {
                return;
            }

            // Cambia el estado local del producto (Activo o Inactivo)
            const nuevoEstado = imagenSeleccionada.estado === 'Activo' ? 'Inactivo' : 'Activo';
            imagenSeleccionada.estado = nuevoEstado;

            // Actualiza la lista local de productos
            const nuevaLista = [...rol];
            setRol(nuevaLista);

            try {
                // Envía la solicitud al servidor para actualizar el estado
                const response = await axios.put(`/api/rol/ToggleEstado/${IdRol}`);
                if (response.status === 200) {
                    // Muestra una alerta de SweetAlert con un mensaje según el estado
                    Swal.fire({
                        icon: 'success',
                        title: `Rol ${nuevoEstado}`,
                        text: `El Rol se ha marcado como ${nuevoEstado}.`,
                        timer: 2000, // Cerrar automáticamente después de 2 segundos
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };













    return (

        <div>
            <NavBar />

            <div className="card ">

                <div className="partedeltitulo">
                    <h2 className="letra">Lista de roles</h2>
                </div>
                <div className="card-body">


                    
                       


                        {/*<div className="btn-neon btn-agre letra2">*/}
                        {/*    <span id="span1"></span>*/}
                        {/*    <span id="span2"></span>*/}
                        {/*    <span id="span3"></span>*/}
                        {/*    <span id="span4"></span>*/}
                        {/*    <a href="/imagen/guardar">Agregar</a>*/}
                        {/*</div>*/}
                    






                    <table className="table1 my-5">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Rol</th>
                                <th scope="col" className="raya">Estado</th>
                                <th scope="col" className="raya">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rolesPaginados.map((rol) => (
                                <tr key={rol.IdRol}>
                                    <td className="raya">{rol.rol1}</td>
                                    <td className="raya">
                                        {rol.estado}
                                        <ReactSwitch
                                            className="mx-2"
                                            checked={rol.estado === 'Activo'}
                                            onChange={() => handleToggleEstado(rol.idRol)}
                                            width={40}
                                            height={18}
                                            handleDiameter={10}
                                            onColor="#007bff"
                                            offColor="#000"
                                            uncheckedIcon={false}
                                        />
                                    </td>
                                    <td className="raya">{formatDate(rol.fecha)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination bajar">
                    <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <BiChevronLeft /> Anterior
                    </button>
                    <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={rolesPaginados.length < rolesPorPagina}>
                        Siguiente <BiChevronRight />
                    </button>
                </div>
                <Modal rolSeleccionado={rolSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>

            <Footer />
        </div>
    );
}