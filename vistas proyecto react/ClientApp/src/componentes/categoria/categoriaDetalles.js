import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const CategoriaDetalles = () => {
    const { idCategoria } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`/api/categoria/Detalles/${idCategoria}`);
                setCategoria(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategoria();
    }, [idCategoria]);

    if (loading) {
        return <div>Cargando categoría...</div>;
    }

    if (!categoria) {
        return <div>No se encontró la categoría.</div>;
    }

    return (
        <div>
            <h2>Detalles de la categoría</h2>
            <p>ID: {categoria.idCategoria}</p>
            <p>Nombre: {categoria.nombreC}</p>
            <p>Estado: {categoria.estado}</p>
            <p>ID Imagen: {categoria.idImagen}</p>
        </div>
    );
};


