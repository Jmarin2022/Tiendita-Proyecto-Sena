import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const EntradumsDetalles = () => {
    const { idEntrada } = useParams();
    const [Entradums, setEntradums] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntradums = async () => {
            try {
                const response = await axios.get(`/api/entradum/Detalles/${idEntrada}`);
                setEntradums(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEntradums();
    }, [idEntrada]);

    if (loading) {
        return <div>Cargando Entradas...</div>;
    }

    if (!Entradums) {
        return <div>No se encontró el Entradas.</div>;
    }

    return (
        <div>
            <h2>Detalles del Entradas</h2>
            <p>ID: {Entradums.idEntrada}</p>
            <p>Producto: {Entradums.idProductos}</p>
            <p>Cantidad: {Entradums.cantidad}</p>
            <p>Proveedor: {Entradums.proveedor}</p>
            <p>Fecha: {Entradums.fecha}</p>
        </div>
    );
};

