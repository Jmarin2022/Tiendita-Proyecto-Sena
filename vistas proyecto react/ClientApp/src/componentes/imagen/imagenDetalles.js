import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ImagenDetalles = () => {
    const { idImagen } = useParams();
    const [imagen, setimagen] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchimagen = async () => {
            try {
                const response = await axios.get(`/api/imagen/Detalles/${idImagen}`);
                setimagen(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchimagen();
    }, [idImagen]);

    if (loading) {
        return <div>Cargando imagen...</div>;
    }

    if (!imagen) {
        return <div>No se encontró el imagen.</div>;
    }

    return (
        <div>
            <h2>Detalles del imagens</h2>
            <p>ID: {imagen.idImagen}</p>
            <p>Producto: {imagen.nombre}</p>
            <p>descripcion: {imagen.descripcion}</p>
            <p>stock: {imagen.stock}</p>
            <p>precio: {imagen.precio}</p>
            <p>stockMax: {imagen.stockMax}</p>
            <p>stockMin: {imagen.stockMin}</p>
            <p>imagen1: {imagen.imagen1}</p>
        </div>
    );
};

