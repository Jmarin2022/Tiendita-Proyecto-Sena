import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const RolEditar = () => {
    const { idRol } = useParams();

    const [rol, setrol] = useState({
        rol1:'',
        estado: '',
        
    });

    useEffect(() => {
        cargarrol();
    }, []);

    const cargarrol = async () => {
        try {
            const response = await axios.get(`/api/rol/${idRol}`);
            setrol(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setrol({
            ...rol,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/rol/Editar/${idRol}`, rol);
            window.location.href = `/rol`;
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div  >
            <NavBar />
            <div className="contenido1">
                <div className="highlight contenidointerior">
                    <h2>Editar Permiso</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">

                            <div className="col">
                    <label htmlFor="rol1">rol:</label>
                                <input className="form-control" type="text" id="rol1" name="rol1" value={rol.rol1} onChange={handleChange} />
                            </div>

                            <div class="col-md-6">
                                <label>Estado</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="estadoActivo"
                                        name="estadoActivo"
                                        checked={rol.estado === 'Activo'}
                                        onChange={() => setrol({ ...rol, estado: 'Activo' })}
                                    />
                                    <label className="form-check-label" htmlFor="estadoActivo">
                                        Activo
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="estadoInactivo"
                                        name="estadoInactivo"
                                        checked={rol.estado === 'Inactivo'}
                                        onChange={() => setrol({ ...rol, estado: 'Inactivo' })}
                                    />
                                    <label className="form-check-label" htmlFor="estadoInactivo">
                                        Inactivo
                                    </label>
                                </div>
                            </div>
                            
                            <button className="btn my-3 btn-primary" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
};


