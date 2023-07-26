import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";
export function Listadoventa() {
    const [venta, setVenta] = useState([]);
    const [ventasPorPagina] = useState(9);
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

    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    const handleLogin = async (username, password) => {
        // ... código de inicio de sesión ...
    };

    const handleLogout = async () => {
        try {
            // Realizar la solicitud al backend para cerrar sesión.
            const response = await axios.post("/api/usuario/Cierre")

            if (response.status === 200) {
                console.log("Cierre de sesión exitoso");
                setLoggedIn(false);
                setToken('');
                localStorage.removeItem('token');
                window.location.href = "/"// Eliminar el token del localStorage
            } else {
                console.log("Error al cerrar sesión");
            }
        } catch (error) {
            console.log(token)
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    {loggedIn ? (
                        <div className="card-header1">
                            <div className="Titulo12">
                                <h2 className="letra12">Juan <BsPerson /></h2>
                            </div>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    ) : (
                        <div className="card-header1">
                            <div className="Titulo12">
                                <h2 className="letra12">Juan <BsPerson /></h2>
                            </div>
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    )}
                    <div className="partedeltitulo">
                        <h2 className="letra">Lista de las ventas</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/venta/guardar">Agregar</a>
                        </div>
                    </div>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control1 pequeño" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-primary pequeño1" type="submit">
                            <BiSearch />
                        </button>
                    </form>

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
