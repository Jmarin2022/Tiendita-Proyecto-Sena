import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

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
            window.location.href = `/categoria`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div >
            <NavBar />
            <div className="contenido1">
                <div className="highlight contenidointerior">
                    <h2>Editar Categoría</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                    <label htmlFor="nombreC">Nombre:</label>
                                <input type="text" className="form-control" id="nombreC" name="nombreC" value={categoria.nombreC} onChange={handleChange} />
                </div>
                            <div className="col">
                    <label htmlFor="estado">estado:</label>
                                <input type="text" className="form-control" id="estado" name="estado" value={categoria.estado} onChange={handleChange} />
                </div>
                            <div className="col">
                    <label htmlFor="idImagen">ID Imagen:</label>
                                <input type="text" className="form-control" id="idImagen" name="idImagen" value={categoria.idImagen} onChange={handleChange} />
                </div>
                            <button type="submit">Guardar</button>
                        </div>
            </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriaEditar;
