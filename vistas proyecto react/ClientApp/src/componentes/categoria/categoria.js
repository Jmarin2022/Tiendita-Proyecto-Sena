import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div className="container">
            <h2>Lista de categoria</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id categoria</th>
                        <th scope="col">Nombre categoria</th>
                        <th scope="col">Estado</th>
                        <th scope="col">IdImagen</th>
                        <th scope="col">Operaciones </th>
                    </tr>
                </thead>
                <tbody>
                    {categoria.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td>{categoria.idCategoria}</td>
                            <td>{categoria.nombreC}</td>
                            <td>{categoria.estado}</td>
                            <td>{categoria.idImagen}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/categoria/editar/${categoria.idCategoria}`}>Editar</Link> |
                                <Link to={`/categoria/detalles/${categoria.idCategoria}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal categoriaSeleccionado={categoriaSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/categoria/guardar">Crear categoria</Link>
        </div>
    );
}
