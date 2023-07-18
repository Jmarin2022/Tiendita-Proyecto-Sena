import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const EntradumsEditar = () => {
    const { idEntrada } = useParams();

    const [Entradums, setEntradums] = useState({
        IdProductos:'',
        Cantidad: '',
        Proveedor :'',
        Fecha:'',
    });

    useEffect(() => {
        cargarEntradums();
    }, []);

    const cargarEntradums = async () => {
        try {
            const response = await axios.get(`/api/entradum/${idEntrada}`);
            setEntradums(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setEntradums({
            ...Entradums,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/entradum/Editar/${idEntrada}`, Entradums);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">
                <div className="highlight contenidointerior">
                    <h2>Editar Entradas</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                    <label htmlFor="idProductos">IdProductos:</label>
                                <input type="text" className="form-control" id="idProductos" name="idProductos" value={Entradums.idProductos} onChange={handleChange} />
                </div>
                            <div className="col">
                    <label htmlFor="cantidad">Cantidad:</label>
                                <input type="text" className="form-control" id="cantidad" name="cantidad" value={Entradums.cantidad} onChange={handleChange} />
                </div>
                            <div className="col">
                    <label htmlFor="proveedor">Proveedor:</label>
                                <input type="text" className="form-control" id="proveedor" name="proveedor" value={Entradums.proveedor} onChange={handleChange} />
                </div>
                            <div className="col">
                    <label htmlFor="fecha">Fecha:</label>
                                <input type="datetime-local" className="form-control" id="fecha" name="fecha" value={Entradums.fecha} onChange={handleChange} />
                </div>
                            <button type="submit">Guardar</button>
                        </div>
            </form>
                </div>
            </div>
        </div>
    );
};


