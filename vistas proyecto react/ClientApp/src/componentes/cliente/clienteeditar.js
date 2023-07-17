import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClienteEditar = () => {
    const { idCliente } = useParams();

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        direccion: '',
    });

    useEffect(() => {
        cargarCliente();
    }, []);

    const cargarCliente = async () => {
        try {
            const response = await axios.get(`/api/cliente/${idCliente}`);
            setCliente(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/cliente/Editar/${idCliente}`, cliente);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={cliente.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" value={cliente.apellido} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="celular">Celular:</label>
                    <input type="text" id="celular" name="celular" value={cliente.celular} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" value={cliente.direccion} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default ClienteEditar;
