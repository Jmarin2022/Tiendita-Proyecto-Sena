import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Detalles del usuarios</h2>
            <p>id: {usuario.id}</p>
            <p>Nombre del usuario: {usuario.usuario1}</p>
            <p>Contraeña: {usuario.contrasena}</p>
            <p>Rol del usuario: {usuario.rol}</p>

        </div>
    );
};

