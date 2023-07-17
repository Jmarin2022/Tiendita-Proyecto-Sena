import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Listadoentradum() {
    const [entradums, setentradums] = useState([]);
    const [entradumSeleccionado, setentradumSeleccionado] = useState(null);

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
                window.location.href="/"
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

    return (
        <div className="container">
            <h2>Lista de entradums</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id entradum</th>
                        <th scope="col">id del producto</th>
                        <th scope="col">Catidad</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Fecha Registro</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entradums.map((entradum) => (
                        <tr key={entradum.IdEntrada}>
                            <td>{entradum.idEntrada}</td>
                            <td>{entradum.idProductos}</td>
                            <td>{entradum.cantidad}</td>
                            <td>{entradum.proveedor}</td>
                            <td>{formatDate(entradum.fecha)}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(entradum)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/entradas/editar/${entradum.idEntrada}`}>Editar</Link> |
                                <Link to={`/entradas/detalles/${entradum.idEntrada}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal entradumSeleccionado={entradumSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/entradum/guardar">Crear entradum</Link>
        </div>
    );
}
