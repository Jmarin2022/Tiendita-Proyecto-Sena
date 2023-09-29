import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import Footer from '../principales/footer';
import '../../assets/css/menu.css'
import { Link } from 'react-router-dom';
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';

import { BiAdjust } from 'react-icons/bi';
import { RiPencilLine } from 'react-icons/ri';

import { FaSignOutAlt } from 'react-icons/fa';



/*import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación*/

export function ListadoCliente() {
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState(""); 



    const mostrarClientes = async (busqueda) => {
        try {
            let url = "/api/cliente/Lista";
            if (busqueda) {
                url = `/api/cliente/Buscar?busqueda=${busqueda}`;
            }
            const response = await axios.get(url);
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        mostrarClientes(searchValue);
    };


    const eliminarCliente = async (idCliente) => {
        try {
            const response = await axios.delete(`/api/cliente/Eliminar/${idCliente}`);
            if (response.status === 200) {
                mostrarClientes();
                setClienteSeleccionado(null);
                window.location.href = "/cliente"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarClientes(searchTerm);
    }, [searchTerm]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString).toLocaleDateString("es-PE", options);
        const time = new Date(dateString).toLocaleTimeString();
        return `${date} | ${time}`;
    };

    const handleEliminarClick = (cliente) => {
        setClienteSeleccionado(cliente);
    };

    const handleConfirmarEliminar = () => {
        if (clienteSeleccionado) {
            eliminarCliente(clienteSeleccionado.idCliente);
        }
    };

    // Paginación: Calcular el índice del primer y último cliente en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClientes = clientes.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
        mostrarClientes(value); // Muestra los clientes según el término de búsqueda
    };


    const generarPDF = async () => {
        try {
            // Hacer la solicitud GET a la API que genera el PDF
            const response = await axios.get('/api/cliente/GenerarPDF', {
                responseType: 'blob', // Esto indica que la respuesta será un archivo
            });

            // Crear un objeto Blob a partir de la respuesta
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Crear una URL para el Blob
            const pdfUrl = window.URL.createObjectURL(pdfBlob);

            // Abrir el PDF en una nueva ventana o pestaña del navegador
            window.open(pdfUrl);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };



    return (
        <div>

          

          


            <NavBar />
            
                <div className="card">
                <div className="partedeltitulo">
                    <h2 className="letra">Lista de los clientes</h2>
                    {/*<Link to="/navbar" className="btn btn-secondary">Volver</Link>*/}
                </div>
                <div className="card-body">
                    <div className="buscardor">
                        <form className="form-inline">
                            <input
                                className="form-control1 pequeño"
                                type="search"
                                placeholder="Buscar Cliente..."
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

                    
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>

                            <a href="/cliente/guardar">Agregar</a>
                        </div>
                    
    

                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Documento</th>
                                <th scope="col" className="raya">Nombre</th>
                                <th scope="col" className="raya">Apellido</th>
                                <th scope="col" className="raya">Celular</th>
                                <th scope="col" className="raya">Fecha Registro</th>
                                <th scope="col" className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {currentClientes.map((cliente) => (
                                <tr key={cliente.idCliente}>
                                    {/* Resto del contenido de cada registro */}
                                    <td className="raya">{cliente.documento}</td>
                                    <td className="raya">{cliente.nombre}</td>
                                    <td className="raya">{cliente.apellido}</td>
                                    <td className="raya">{cliente.celular}</td>
                                    <td className="raya">{formatDate(cliente.fechaRegistro)}</td>
                                    <td className="raya corto">
                                        <button className="btn espacio" onClick={() => handleEliminarClick(cliente)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BsTrash className="btn-outline-danger icon" />
                                            <AiOutlineClose className="btn-outline-danger icon-open" />
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => { window.location.href = `/cliente/editar/${cliente.idCliente}`; }}
                                        >
                                            <BsPencil className="iconedit" />



                                        </button>

                                    </td>
                                </tr>

                            ))}
                            
                                
                            
                        </tbody>
                    </table>
                    <span className="totalregistros">
                        Total de registros: {clientes.length}
                    </span>
                    
                </div>

                <button className="btn btn-primary" onClick={generarPDF}>
                    Generar PDF
                </button>
                    <div className="pagination bajar">
                        <button className="btn mx-2 btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentClientes.length < itemsPerPage}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
            <Footer />
            {/* Modal para confirmar la eliminación */}
            <Modal clienteSeleccionado={clienteSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
        </div>
    );
}
