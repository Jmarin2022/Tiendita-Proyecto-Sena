import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

export function Listadoventa() {
    const [venta, setVenta] = useState([]);
    const [ventasPorPagina] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);

    const mostrarVenta = async () => {
        try {
            const response = await axios.get("/api/ventum/Lista");
            setVenta(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarVenta();
    }, []);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const indexOfLastVenta = currentPage * ventasPorPagina;
    const indexOfFirstVenta = indexOfLastVenta - ventasPorPagina;
    const ventasPaginadas = venta.slice(indexOfFirstVenta, indexOfLastVenta);

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                <div className="Titulo1">
                    <h2 className="letra">Lista de las ventas</h2>
                    <div className="btn-neon">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/ventas/guardar">Agregar</a>
                    </div>
                </div></div>

                    <div className="card-body">
                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">Id venta</th>
                                <th scope="col" className="raya">Cliente</th>
                                <th scope="col" className="raya">Fecha de la venta</th>
                                <th scope="col" className="raya">Total</th>
                                <th scope="col" className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasPaginadas.map((venta) => (
                                <tr key={venta.Id}>
                                    <td className="raya">{venta.id}</td>
                                    <td className="raya">{venta.cliente}</td>
                                    <td className="raya">{venta.fechaventa}</td>
                                    <td className="raya">{venta.total}</td>
                                    <td className="raya corto">
                                        <button className="btn btn-success espacio" onClick={() => { window.location.href = `/detalleventa/detalle/${venta.id}`; }}>
                                            <BiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    </div>
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={ventasPaginadas.length < ventasPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
            </div>
        </div></div>
    );
}
