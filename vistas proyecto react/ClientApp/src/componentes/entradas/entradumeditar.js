import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <h2>Editar Entradums</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idProductos">IdProductos:</label>
                    <input type="text" id="idProductos" name="idProductos" value={Entradums.idProductos} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input type="text" id="cantidad" name="cantidad" value={Entradums.cantidad} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="proveedor">Proveedor:</label>
                    <input type="text" id="proveedor" name="proveedor" value={Entradums.proveedor} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="fecha">Dirección:</label>
                    <input type="text" id="fecha" name="fecha" value={Entradums.fecha} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};


