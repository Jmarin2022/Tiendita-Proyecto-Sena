import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const PermisosDetalles = () => {
    const { idPermisos } = useParams();
    const [permisos, setpermisos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchpermisos = async () => {
            try {
                const response = await axios.get(`/api/permiso/Detalles/${idPermisos}`);
                setpermisos(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchpermisos();
    }, [idPermisos]);

    if (loading) {
        return <div>Cargando permisos...</div>;
    }

    if (!permisos) {
        return <div>No se encontró el permisos.</div>;
    }

    return (
        <div  >
            <NavBar />
            <div className="contenido1">


                <div className="Titulo">
                    <h2 class="letra">Detqalle de los permisos</h2>
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

                        </tr>
                    </thead>
                    <tbody>

                            <tr >
                            <td className="raya">{permisos.idPermisos}</td>
                            <td className="raya">{permisos.modulo}</td>
                            <td className="raya">{permisos.crear}</td>
                            <td className="raya">{permisos.eliminar}</td>
                            <td className="raya">{permisos.editar}</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

