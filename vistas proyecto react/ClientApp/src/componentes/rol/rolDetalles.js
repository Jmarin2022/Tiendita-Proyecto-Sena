import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Detalles del Rols</h2>
            <p>ID: {Rol.idRol}</p>
            <p>nombre del rol: {Rol.rol1}</p>
            <p>Fecha de creacion: {Rol.fecha}</p>
        </div>
    );
};

