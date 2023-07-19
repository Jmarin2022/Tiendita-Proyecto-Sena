import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const EntradumsDetalles = () => {
    const { idEntrada } = useParams();
    const [Entradums, setEntradums] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntradums = async () => {
            try {
                const response = await axios.get(`/api/entradum/Detalles/${idEntrada}`);
                setEntradums(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchEntradums();
    }, [idEntrada]);

    if (loading) {
        return <div>Cargando Entradas...</div>;
    }

    if (!Entradums) {
        return <div>No se encontró el Entradas.</div>;
    }

    return (
        <div  >
            <NavBar />
            <div className="contenido1">


                <div className="Titulo">
                    <h2 class="letra">Lista de las entradas</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/entradas/guardar">Agregar</a>
                    </div>
                </div>


                <table className="table1">
                    <thead>
                        <tr>
                            <th scope="col " className="raya">Id entradum</th>
                            <th scope="col " className="raya">id del producto</th>
                            <th scope="col " className="raya">Cantidad</th>
                            <th scope="col " className="raya">Proveedor</th>
                            <th scope="col " className="raya">Fecha Registro</th>

                        </tr>
                    </thead>
                    <tbody>

                            <tr>
                            <td className="raya">{Entradums.idEntrada}</td>
                            <td className="raya">{Entradums.idProductos}</td>
                            <td className="raya">{Entradums.cantidad}</td>
                            <td className="raya">{Entradums.proveedor}</td>
                            <td className="raya">{Entradums.fecha}</td>

                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

