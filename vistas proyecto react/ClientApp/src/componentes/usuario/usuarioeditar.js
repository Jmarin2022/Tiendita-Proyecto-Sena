import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const UsuarioEditar = () => {
    const { id } = useParams();

    const [usuario, setusuario] = useState({
        usuario1:'',
        contrasena: '',
        rol :'',
    });

    useEffect(() => {
        cargarusuario();
    }, []);

    const cargarusuario = async () => {
        try {
            const response = await axios.get(`/api/usuario/${id}`);
            setusuario(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setusuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/usuario/Editar/${id}`, usuario);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Editar usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usuario1">usuario1:</label>
                    <input type="text" id="usuario1" name="usuario1" value={usuario.usuario1} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="contrasena">contrasena:</label>
                    <input type="text" id="contrasena" name="contrasena" value={usuario.contrasena} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="rol">rol:</label>
                    <input type="text" id="rol" name="rol" value={usuario.rol} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};


