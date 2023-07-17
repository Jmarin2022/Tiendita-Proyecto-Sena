import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div className="container">
            <h2>Lista de clientes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id Cliente</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Fecha Registro</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.idCliente}>
                            <td>{cliente.idCliente}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{formatDate(cliente.fechaRegistro)}</td>
                            <td>
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
            <Link to="/cliente/guardar">Crear Cliente</Link>
        </div>
    );
}
