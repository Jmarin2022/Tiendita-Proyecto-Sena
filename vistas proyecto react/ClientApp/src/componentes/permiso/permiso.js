import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
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
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de los permisos</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/permiso/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                <thead>
                    <tr>
                         <th scope="col " className="raya">Id permiso</th>
                         <th scope="col " className="raya">Modulo</th>
                         <th scope="col " className="raya">Crear</th>
                         <th scope="col " className="raya">Eliminar</th>
                         <th scope="col " className="raya">Editar</th>
                         <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {permiso.map((permiso) => (
                        <tr key={permiso.IdPermisos}>
                            <td className="raya">{permiso.idPermisos}</td>
                            <td className="raya">{permiso.modulo}</td>
                            <td className="raya">{permiso.crear}</td>
                            <td className="raya">{permiso.eliminar}</td>
                            <td className="raya">{permiso.editar}</td>
                            <td className="raya corto">
                                <button onClick={() => handleEliminarClick(permiso)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/permiso/editar/${permiso.idPermisos}`}>Editar</Link> |
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal permisosSeleccionado={permisosSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
        </div>
    );
}
