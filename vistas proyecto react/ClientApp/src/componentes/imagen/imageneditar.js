import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

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
            window.location.href = `/imagen`;
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="container1">
            <NavBar />
            <div className="contenido">
                <div className="highlight contenidointerior">
                    <h2>Editar Cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">

                            <div className="col">
                    <label htmlFor="nombre">nombre:</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={imagen.nombre} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="descripcion">descripcion:</label>
                    <input type="text" className="form-control" id="descripcion" name="descripcion" value={imagen.descripcion} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="stock">stock:</label>
                    <input type="text" className="form-control" id="stock" name="stock" value={imagen.stock} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="precio">precio:</label>
                    <input type="text" className="form-control" id="precio" name="precio" value={imagen.precio} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="categoria">categoria:</label>
                    <input type="text" className="form-control" id="categoria" name="categoria" value={imagen.categoria} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="stockMax">stockMax:</label>
                    <input type="text" className="form-control" id="stockMax" name="stockMax" value={imagen.stockMax} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="stockMin">stockMin:</label>
                    <input type="text" className="form-control" id="stockMin" name="stockMin" value={imagen.stockMin} onChange={handleChange} />
                </div>
                 <div className="col">
                    <label htmlFor="imagen1">imagen1:</label>
                    <input type="text" className="form-control" id="imagen1" name="imagen1" value={imagen.imagen1} onChange={handleChange} />
                </div>
                            <button type="submit">Guardar</button>
                        </div>
            </form>
                </div>
            </div>
        </div>
    );
};


