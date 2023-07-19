import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export const CategoriaDetalles = () => {
    const { idCategoria } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`/api/categoria/Detalles/${idCategoria}`);
                setCategoria(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategoria();
    }, [idCategoria]);

    if (loading) {
        return <div>Cargando categoría...</div>;
    }

    if (!categoria) {
        return <div>No se encontró la categoría.</div>;
    }

    return (
        <div >
            <NavBar />
            <div className="contenido1">


                <div className="Titulo">
                    <h2 class="letra">Lista de las categorias</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/categoria/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                    <thead>
                        <tr>
                            <th className="raya" scope="col">Id categoria</th>
                            <th className="raya" scope="col">Nombre categoria</th>
                            <th className="raya" scope="col">Estado</th>
                            <th className="raya" scope="col">IdImagen</th>

                        </tr>
                    </thead>
                    <tbody>

                            <tr >
                                <td className="raya">{categoria.idCategoria}</td>
                                <td className="raya">{categoria.nombreC}</td>
                                <td className="raya">{categoria.estado}</td>
                                <td className="raya">{categoria.idImagen}</td>
                            </tr>
                    </tbody>
                   </table>
            </div>
        </div>
    );
};


