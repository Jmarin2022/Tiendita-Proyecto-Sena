import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ClienteDetalles = () => {
    const { idCliente } = useParams();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`/api/cliente/Detalles/${idCliente}`);
                setCliente(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCliente();
    }, [idCliente]);

    if (loading) {
        return <div>Cargando cliente...</div>;
    }

    if (!cliente) {
        return <div>No se encontró el cliente.</div>;
    }

    return (
        <div>
            <h2>Detalles del cliente</h2>
            <p>ID: {cliente.idCliente}</p>
            <p>Nombre: {cliente.nombre}</p>
            <p>Apellido: {cliente.apellido}</p>
            <p>Celular: {cliente.celular}</p>
            <p>Dirección: {cliente.direccion}</p>
            <p>Fecha de registro: {cliente.fechaRegistro}</p>
            <p>Estado: {cliente.estado}</p>
        </div>
    );
};

