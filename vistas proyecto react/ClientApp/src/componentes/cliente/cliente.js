import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
export function ListadoCliente() {
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

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

    return (
        
        <div className="container1">
            <NavBar />
            <div className="contenido">

                    
                <div className="Titulo">
                    <h2 class="letra">Lista de clientes</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/cliente/guardar">Agregar</a>

                    </div>
                </div>
                
                
            <table className="table1">
                <thead>
                    <tr>
                            <th scope="col " className="raya">Id Cliente</th>
                            <th scope="col " className="raya">Nombre</th>
                            <th scope="col " className="raya">Apellido</th>
                            <th scope="col " className="raya">Fecha Registro</th>
                            <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.idCliente}>
                            <td className="raya">{cliente.idCliente}</td>
                            <td className="raya">{cliente.nombre}</td>
                            <td className="raya">{cliente.apellido}</td>
                            <td className="raya">{formatDate(cliente.fechaRegistro)}</td>
                            <td className="raya corto">
                                <button onClick={() => handleEliminarClick(cliente)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/cliente/editar/${cliente.idCliente}`}>Editar</Link> |
                                <Link to={`/cliente/detalles/${cliente.idCliente}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal clienteSeleccionado={clienteSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
        </div>
    );
}
