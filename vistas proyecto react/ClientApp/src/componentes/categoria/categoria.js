import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

export function Listadocategoria() {
    const [categoria, setcategoria] = useState([]);
    const [categoriaSeleccionado, setcategoriaSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                window.location.href = "/categoria"
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

    // Paginación: Calcular el índice del primer y último cliente en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategorias = categoria.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <NavBar />
            <div className="contenido1">
                <div className="Titulo">
                    <h2 className="letra">Lista de categorías</h2>
                    <div className="btn-neon">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/categoria/guardar">Agregar</a>
                    </div>
                </div>

                <div className="container2">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th className="raya" scope="col">Id categoria</th>
                                <th className="raya" scope="col">Nombre categoria</th>
                                <th className="raya" scope="col">Estado</th>
                                <th className="raya" scope="col">IdImagen</th>
                                <th className="raya" scope="col">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategorias.map((categoria) => (
                                <tr key={categoria.idCategoria}>
                                    <td className="raya">{categoria.idCategoria}</td>
                                    <td className="raya">{categoria.nombreC}</td>
                                    <td className="raya">{categoria.estado}</td>
                                    <td className="raya">{categoria.idImagen}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(categoria)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button
                                            className="btn btn-primary espacio"
                                            onClick={() => { window.location.href = `/categoria/editar/${categoria.idCategoria}`; }}
                                        >
                                            <BiBrush />
                                        </button>
                                        <button className="btn btn-success espacio" onClick={() => { window.location.href = `/categoria/detalles/${categoria.idCategoria}`; }}>
                                            <BiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentCategorias.length < itemsPerPage}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal para confirmar la eliminación */}
            <Modal categoriaSeleccionado={categoriaSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
        </div>
    );
}
