import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const UsuarioDetalles = () => {
    const { id } = useParams();
    const [usuario, setusuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchusuario = async () => {
            try {
                const response = await axios.get(`/api/usuario/Detalles/${id}`);
                setusuario(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchusuario();
    }, [id]);

    if (loading) {
        return <div>Cargando usuario...</div>;
    }

    if (!usuario) {
        return <div>No se encontró el usuario.</div>;
    }

    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Detalle del usuario</h2>
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

                        </tr>
                    </thead>
                    <tbody>

                            <tr >
                                <td className="raya">{usuario.id}</td>
                                <td className="raya">{usuario.rol}</td>
                                <td className="raya">{usuario.usuario1}</td>
                                <td className="raya">{usuario.contrasena}</td>
                            </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

