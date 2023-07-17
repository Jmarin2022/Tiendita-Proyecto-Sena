import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function ListadoRol() {
    const [Rol, setRol] = useState([]);
    const [RolSeleccionado, setRoleleccionado] = useState(null);

    const mostrarRol = async () => {
        try {
            const response = await axios.get("/api/rol/Lista");
            setRol(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarRol = async (IdRol) => {
        try {
            const response = await axios.delete(`/api/rol/Eliminar/${IdRol}`);
            if (response.status === 200) {
                mostrarRol();
                setRoleleccionado(null);
                window.location.href = "/"
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

    const handleEliminarClick = (Rol) => {
        setRoleleccionado(Rol);
    };

    const handleConfirmarEliminar = () => {
        if (RolSeleccionado) {
            eliminarRol(RolSeleccionado.idRol);

        }
    };

    return (
        <div className="container">
            <h2>Lista de Rol</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id Rol</th>
                        <th scope="col">Rol1</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Rol.map((Rol) => (
                        <tr key={Rol.IdRol}>
                            <td>{Rol.idRol}</td>
                            <td>{Rol.rol1}</td>
                            <td>{formatDate(Rol.fecha)}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(Rol)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/rol/editar/${Rol.idRol}`}>Editar</Link> |
                                <Link to={`/rol/detalles/${Rol.idRol}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal RolSeleccionado={RolSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/Rol/guardar">Crear Rol</Link>
        </div>
    );
}
