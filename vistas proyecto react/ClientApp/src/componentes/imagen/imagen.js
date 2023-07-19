import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas

export function Listadoimagen() {
    const [imagen, setimagen] = useState([]);
    const [imagenSeleccionado, setimageneleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const mostrarimagen = async () => {
        try {
            const response = await axios.get("/api/imagen/Lista");
            setimagen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarimagen = async (IdImagen) => {
        try {
            const response = await axios.delete(`/api/imagen/Eliminar/${IdImagen}`);
            if (response.status === 200) {
                mostrarimagen();
                setimageneleccionado(null);
                window.location.href = "/imagen";
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarimagen();
    }, []);

    const handleEliminarClick = (imagen) => {
        setimageneleccionado(imagen);
    };

    const handleConfirmarEliminar = () => {
        if (imagenSeleccionado) {
            eliminarimagen(imagenSeleccionado.idImagen);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = imagen.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                <div className="Titulo">
                            <div className="btn-neon1">
                                <span id="span1"></span>
                                <span id="span2"></span>
                                <span id="span3"></span>
                                <span id="span4"></span>
                                <a href="/categoria">Categoria</a>
                            </div>
                    <h2 className="letra">Lista de los Productos</h2>
                    <div className="btn-neon">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/imagen/guardar">Agregar</a>
                    </div>
                </div></div>
                    <div className="card-body">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Id imagen</th>
                                <th scope="col" className="raya">Nombre</th>
                                <th scope="col" className="raya">Stock</th>
                                <th scope="col" className="raya">Precio</th>
                                <th scope="col" className="raya">Categoria</th>
                                <th scope="col" className="raya">StockMax</th>
                                <th scope="col" className="raya">StockMin</th>
                                <th scope="col" className="raya">Imagen1</th>
                                <th scope="col" className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((imagen) => (
                                <tr key={imagen.IdImagen}>
                                    <td className="raya">{imagen.idImagen}</td>
                                    <td className="raya">{imagen.nombre}</td>
                                    <td className="raya">{imagen.stock}</td>
                                    <td className="raya">{imagen.precio}</td>
                                    <td className="raya">{imagen.categoria}</td>
                                    <td className="raya">{imagen.stockMax}</td>
                                    <td className="raya">{imagen.stockMin}</td>
                                    <td className="raya">{imagen.imagen1}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio  espacio" onClick={() => handleEliminarClick(imagen)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button
                                            className="btn btn-primary  espacio espacio "
                                            onClick={() => { window.location.href = `/imagen/editar/${imagen.idImagen}`; }}
                                        >
                                            <BiBrush />
                                        </button>
                                        <button className="btn btn-success  espacio espacio" onClick={() => { window.location.href = `/imagen/detalle/${imagen.idImagen}`; }}>
                                            <BiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
                {/* Modal para confirmar la eliminación */}
                <Modal imagenSeleccionado={imagenSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
        </div></div>
    );
}
