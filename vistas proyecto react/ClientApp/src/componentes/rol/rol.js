import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
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
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de los roles</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/Rol/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                <thead>
                    <tr>
                        <th scope="col " className="raya">Id Rol</th>
                        <th scope="col " className="raya">Rol1</th>
                        <th scope="col " className="raya">Fecha</th>
                        <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {Rol.map((Rol) => (
                        <tr key={Rol.IdRol}>
                            <td className="raya">{Rol.idRol}</td>
                            <td className="raya">{Rol.rol1}</td>
                            <td className="raya">{formatDate(Rol.fecha)}</td>
                            <td className="raya corto">
                                <button onClick={() => handleEliminarClick(Rol)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/rol/editar/${Rol.idRol}`}>Editar</Link> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal RolSeleccionado={RolSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
        </div>
    );
}
