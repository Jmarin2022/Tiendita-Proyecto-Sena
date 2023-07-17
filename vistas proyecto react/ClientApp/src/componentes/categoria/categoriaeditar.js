import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoriaEditar = () => {
    const { idCategoria } = useParams();

    const [categoria, setCategoria] = useState({
        nombreC: '',
        estado: '',
        idImagen: '',
    });

    useEffect(() => {
        cargarCategoria();
    }, []);

    const cargarCategoria = async () => {
        try {
            const response = await axios.get(`/api/categoria/${idCategoria}`);
            setCategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/categoria/Editar/${idCategoria}`, categoria);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Editar Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombreC">Nombre:</label>
                    <input type="text" id="nombreC" name="nombreC" value={categoria.nombreC} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="estado">estado:</label>
                    <input type="text" id="estado" name="estado" value={categoria.estado} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="idImagen">ID Imagen:</label>
                    <input type="text" id="idImagen" name="idImagen" value={categoria.idImagen} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default CategoriaEditar;
