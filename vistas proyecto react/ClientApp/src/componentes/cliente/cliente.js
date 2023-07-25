import { useEffect, useState } from 'react';
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
export function ListadoCliente() {
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const mostrarClientes = async () => {
        try {
            const response = await axios.get("/api/cliente/Lista");
            setClientes(response.data);
        } catch (error) {
            console.error(error);
        }
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
        mostrarClientes();
    }, []);

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

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1 ">
                        <div className="Titulo12">
                            <h2 className="letra12">Juan <BsPerson /></h2>
                        </div>
                    </div>

                    <div className="partedeltitulo">
                        <h2 className="letra">Lista de los clientes</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/cliente/guardar">Agregar</a>
                        </div>
                    </div>
                    <div className="reducir  " >
                        <input type="search" className="form-control1" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0 pegado" id="search-addon">
                            <BiSearch />
                        </span>
                    </div>
                    <div className="card-body">
               
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Id Cliente</th>
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
                                    <td className="raya">{cliente.idCliente}</td>
                                    <td className="raya">{cliente.nombre}</td>
                                    <td className="raya">{cliente.apellido}</td>
                                    <td className="raya">{cliente.celular}</td>
                                    <td className="raya">{formatDate(cliente.fechaRegistro)}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(cliente)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button
                                            className="btn btn-primary espacio"
                                            onClick={() => { window.location.href = `/cliente/editar/${cliente.idCliente}`; }}
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
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentClientes.length < itemsPerPage}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
            {/* Modal para confirmar la eliminación */}
            <Modal clienteSeleccionado={clienteSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
        </div></div>
    );
}
