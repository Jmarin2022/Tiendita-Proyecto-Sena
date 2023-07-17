import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Listadopermiso() {
    const [permiso, setpermiso] = useState([]);
    const [permisosSeleccionado, setpermisoeleccionado] = useState(null);

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
                setpermisoeleccionado(null);
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarpermiso();
    }, []);

    const handleEliminarClick = (permiso) => {
        setpermisoeleccionado(permiso);
    };

    const handleConfirmarEliminar = () => {
        if (permisosSeleccionado) {
            eliminarpermiso(permisosSeleccionado.idPermisos);

        }
    };

    return (
        <div className="container">
            <h2>Lista de permiso</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id permiso</th>
                        <th scope="col">Modulo</th>
                        <th scope="col">Crear</th>
                        <th scope="col">Eliminar</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {permiso.map((permiso) => (
                        <tr key={permiso.IdPermisos}>
                            <td>{permiso.idPermisos}</td>
                            <td>{permiso.modulo}</td>
                            <td>{permiso.crear}</td>
                            <td>{permiso.eliminar}</td>
                            <td>{permiso.editar}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(permiso)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/permiso/editar/${permiso.idPermisos}`}>Editar</Link> |
                                <Link to={`/permiso/detalles/${permiso.idPermisos}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal permisosSeleccionado={permisosSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/permiso/guardar">Crear permiso</Link>
        </div>
    );
}
