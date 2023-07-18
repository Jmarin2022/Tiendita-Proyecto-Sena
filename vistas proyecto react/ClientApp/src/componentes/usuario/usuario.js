import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
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
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de usuarios</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/usuario/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                <thead>
                    <tr>
                        <th scope="col " className="raya">Id usuario</th>
                        <th scope="col " className="raya">Rol</th>
                        <th scope="col " className="raya">Nombre del usuario</th>
                        <th scope="col " className="raya">Contraseña</th>
                        <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuario.map((usuario) => (
                        <tr key={usuario.Id}>
                            <td className="raya">{usuario.id}</td>
                            <td className="raya">{usuario.rol}</td>
                            <td className="raya">{usuario.usuario1}</td>
                            <td className="raya">{usuario.contrasena}</td>
                            <td className="raya corto">
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
            </div>
        </div>
    );
}
