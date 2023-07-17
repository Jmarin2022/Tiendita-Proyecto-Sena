import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Listadousuario() {
    const [usuario, setusuario] = useState([]);
    const [usuarioSeleccionado, setusuarioeleccionado] = useState(null);

    const mostrarusuario = async () => {
        try {
            const response = await axios.get("/api/usuario/Lista");
            setusuario(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarusuario = async (Id) => {
        try {
            const response = await axios.delete(`/api/usuario/Eliminar/${Id}`);
            if (response.status === 200) {
                mostrarusuario();
                setusuarioeleccionado(null);
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarusuario();
    }, []);

    const handleEliminarClick = (usuario) => {
        setusuarioeleccionado(usuario);
    };

    const handleConfirmarEliminar = () => {
        if (usuarioSeleccionado) {
            eliminarusuario(usuarioSeleccionado.id);

        }
    };

    return (
        <div className="container">
            <h2>Lista de usuario</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id usuario</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Nombre del usuario</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.map((usuario) => (
                        <tr key={usuario.Id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.usuario1}</td>
                            <td>{usuario.contrasena}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(usuario)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/usuario/editar/${usuario.id}`}>Editar</Link> |
                                <Link to={`/usuario/detalles/${usuario.id}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal usuarioSeleccionado={usuarioSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/usuario/guardar">Crear usuario</Link>
        </div>
    );
}
