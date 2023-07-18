import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const ClienteDetalles = () => {
    const { idCliente } = useParams();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await axios.get(`/api/cliente/Detalles/${idCliente}`);
                setCliente(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCliente();
    }, [idCliente]);

    if (loading) {
        return <div>Cargando cliente...</div>;
    }

    if (!cliente) {
        return <div>No se encontró el cliente.</div>;
    }

    return (

        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Detalle del cliente</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/cliente/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                    <thead>
                        <tr>
                            <th scope="col " className="raya">Id Cliente</th>
                            <th scope="col " className="raya">Nombre</th>
                            <th scope="col " className="raya">Apellido</th>
                            <th scope="col " className="raya">Fecha Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td className="raya">{cliente.idCliente}</td>
                                <td className="raya">{cliente.nombre}</td>
                                <td className="raya">{cliente.apellido}</td>
                                <td className="raya">{cliente.fechaRegistro}</td>
                            </tr>
                    </tbody>
                    </table>
            </div>
        </div>
    );
};

