import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Detalles del permisoss</h2>
            <p>ID: {permisos.idPermisos}</p>
            <p>Modulo: {permisos.modulo}</p>
            <p>Crear: {permisos.crear}</p>
            <p>Eliminar: {permisos.eliminar}</p>
            <p>Editar: {permisos.editar}</p>
        </div>
    );
};

