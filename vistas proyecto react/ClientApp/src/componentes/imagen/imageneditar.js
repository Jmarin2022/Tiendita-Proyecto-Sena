import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ImagenEditar = () => {
    const { idImagen } = useParams();

    const [imagen, setimagen] = useState({
        nombre:'',
        descripcion: '',
        stock :'',
        precio: '',
        categoria: '',
        stockMax: '',
        stockMin: '',
        imagen1: '',
    });

    useEffect(() => {
        cargarimagen();
    }, []);

    const cargarimagen = async () => {
        try {
            const response = await axios.get(`/api/imagen/${idImagen}`);
            setimagen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setimagen({
            ...imagen,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/imagen/Editar/${idImagen}`, imagen);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Editar imagen</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={imagen.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="descripcion">descripcion:</label>
                    <input type="text" id="descripcion" name="descripcion" value={imagen.descripcion} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stock">stock:</label>
                    <input type="text" id="stock" name="stock" value={imagen.stock} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="precio">precio:</label>
                    <input type="text" id="precio" name="precio" value={imagen.precio} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="categoria">categoria:</label>
                    <input type="text" id="categoria" name="categoria" value={imagen.categoria} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stockMax">stockMax:</label>
                    <input type="text" id="stockMax" name="stockMax" value={imagen.stockMax} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stockMin">stockMin:</label>
                    <input type="text" id="stockMin" name="stockMin" value={imagen.stockMin} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imagen1">imagen1:</label>
                    <input type="text" id="imagen1" name="imagen1" value={imagen.imagen1} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};


