import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PermisosEditar = () => {
    const { idPermisos } = useParams();

    const [Permisos, setPermisos] = useState({
        modulo:'',
        crear: '',
        eliminar :'',
        editar: '',
    });

    useEffect(() => {
        cargarPermisos();
    }, []);

    const cargarPermisos = async () => {
        try {
            const response = await axios.get(`/api/permiso/${idPermisos}`);
            setPermisos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setPermisos({
            ...Permisos,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/permiso/Editar/${idPermisos}`, Permisos);
            window.location.href = `/`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Editar Permisos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="modulo">modulo:</label>
                    <input type="text" id="modulo" name="modulo" value={Permisos.modulo} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="crear">crear:</label>
                    <input type="text" id="crear" name="crear" value={Permisos.crear} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="eliminar">eliminar:</label>
                    <input type="text" id="eliminar" name="eliminar" value={Permisos.eliminar} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="editar">editar:</label>
                    <input type="text" id="editar" name="editar" value={Permisos.editar} onChange={handleChange} />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
};


