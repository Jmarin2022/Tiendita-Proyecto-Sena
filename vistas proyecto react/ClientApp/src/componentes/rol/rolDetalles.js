import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const RolDetalles = () => {
    const { idRol } = useParams();
    const [Rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const response = await axios.get(`/api/rol/Detalles/${idRol}`);
                setRol(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchRol();
    }, [idRol]);

    if (loading) {
        return <div>Cargando Rol...</div>;
    }

    if (!Rol) {
        return <div>No se encontró el Rol.</div>;
    }

    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Detalle del roll</h2>
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
                        </tr>
                    </thead>
                    <tbody>

                            <tr>
                                <td className="raya">{Rol.idRol}</td>
                                <td className="raya">{Rol.rol1}</td>
                                <td className="raya">{Rol.fecha}</td>
                            </tr>
                    </tbody>
                </table>

                {/* Modal para confirmar la eliminación */}

            </div>
        </div>
    );
};

