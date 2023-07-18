import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
export function Listadocategoria() {
    const [categoria, setcategoria] = useState([]);
    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);

    const mostrarcategoria = async () => {
        try {
            const response = await axios.get("/api/categoria/Lista");
            setcategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarcategoria = async (idCategoria) => {
        try {
            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
            if (response.status === 200) {
                mostrarcategoria();
                setcategoriaSeleccionado(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarcategoria();
    }, []);


    const handleEliminarClick = (categoria) => {
        setcategoriaSeleccionado(categoria);
    };

    const handleConfirmarEliminar = () => {
        if (categoriaSeleccionado) {
            eliminarcategoria(categoriaSeleccionado.idCategoria);
        }
    };

    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">


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
                        <th className="raya" scope="col">Operaciones </th>
                    </tr>
                </thead>
                <tbody>
                    {categoria.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td className="raya">{categoria.idCategoria}</td>
                            <td className="raya">{categoria.nombreC}</td>
                            <td className="raya">{categoria.estado}</td>
                            <td className="raya">{categoria.idImagen}</td>
                            <td className="raya corto">
                                <button onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/categoria/editar/${categoria.idCategoria}`}>Editar</Link> |
                                <Link to={`/categoria/detalles/${categoria.idCategoria}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Modal para confirmar la eliminación */}
            <Modal categoriaSeleccionado={categoriaSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
        </div>
    );
}
