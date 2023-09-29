import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

const ClienteEditar = () => {
    const { idCliente } = useParams();

    const [cliente, setCliente] = useState({
        documento:'',
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
            window.location.href = `/cliente`;
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div  >
            <NavBar />
            <div className="contenido1">
                <div className="highlight contenidointerior">
                    <h2>Editar Cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">

                            <div className="col">
                                <label htmlFor="documento">Documento:</label>
                                <input className="form-control"  type="text" id="documento" name="documento" value={cliente.documento} onChange={handleChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="nombre">Nombre:</label>
                                <input className="form-control" type="text" id="nombre" name="nombre" value={cliente.nombre} onChange={handleChange} />
                            </div>

                            <div className="col">
                                <label htmlFor="apellido">Apellido:</label>
                                <input type="text" className="form-control" form-control id="apellido" name="apellido" value={cliente.apellido} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="celular">Celular:</label>
                                <input type="text " className="form-control" id="celular" name="celular" value={cliente.celular} onChange={handleChange} />
                            </div>
                            <div className="col">
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" className="form-control" id="direccion" name="direccion" value={cliente.direccion} onChange={handleChange} />
                            </div>
                            
                                <button type="submit">Guardar</button>
                        </div>
                        

                    </form>
                </div>
               
            </div>
        </div>
            
    );
};

export default ClienteEditar;
