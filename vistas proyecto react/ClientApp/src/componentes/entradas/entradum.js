import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas

export function Listadoentradum() {
    const [entradums, setentradums] = useState([]);
    const [entradumSeleccionado, setentradumSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const entradasPorPagina = 12;

    const mostrarentradums = async () => {
        try {
            const response = await axios.get("/api/entradum/Lista");
            setentradums(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarentradum = async (idEntrada) => {
        try {
            const response = await axios.delete(`/api/entradum/Eliminar/${idEntrada}`);
            if (response.status === 200) {
                mostrarentradums();
                setentradumSeleccionado(null);
                window.location.href = "/entradas";
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarentradums();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString).toLocaleDateString("es-PE", options);
        const time = new Date(dateString).toLocaleTimeString();
        return `${date} | ${time}`;
    };

    const handleEliminarClick = (entradum) => {
        setentradumSeleccionado(entradum);
    };

    const handleConfirmarEliminar = () => {
        if (entradumSeleccionado) {
            eliminarentradum(entradumSeleccionado.idEntrada);
        }
    };

    const indexOfLastEntrada = currentPage * entradasPorPagina;
    const indexOfFirstEntrada = indexOfLastEntrada - entradasPorPagina;
    const entradasPaginadas = entradums.slice(indexOfFirstEntrada, indexOfLastEntrada);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div  >
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                <div className="Titulo1">
                    <h2 className="letra">Lista de las entradas</h2>
                    <div className="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/entradas/guardar">Agregar</a>
                    </div>
                </div></div>
                    <div className="card-body">

                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col " className="raya">Id entradum</th>
                                <th scope="col " className="raya">id del producto</th>
                                <th scope="col " className="raya">Catidad</th>
                                <th scope="col " className="raya">Proveedor</th>
                                <th scope="col " className="raya">Fecha Registro</th>
                                <th scope="col " className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradasPaginadas.map((entradum) => (
                                <tr key={entradum.IdEntrada}>
                                    <td className="raya">{entradum.idEntrada}</td>
                                    <td className="raya">{entradum.idProductos}</td>
                                    <td className="raya">{entradum.cantidad}</td>
                                    <td className="raya">{entradum.proveedor}</td>
                                    <td className="raya">{formatDate(entradum.fecha)}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(entradum)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BiTrash />
                                        </button>
                                        <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/entradas/editar/${entradum.idEntrada}`; }}>
                                            <BiBrush />
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Modal para confirmar la eliminación */}
                    <Modal entradumSeleccionado={entradumSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                </div>
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={entradasPaginadas.length < entradasPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
        </div></div>
    );
}
