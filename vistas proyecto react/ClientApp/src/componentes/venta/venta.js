import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BiSearch } from "react-icons/bi";
import Footer from '../principales/footer';
import { useUserContext } from '../principales/UserContext'
import { useNavigate } from 'react-router-dom';
import numeral from 'numeral';

export function Listadoventa() {
    const { userPayload } = useUserContext();

    const [venta, setVenta] = useState([]);
    const [ventasPorPagina] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");



    const mostrarVenta = async (busqueda) => {
        try {
            let url = "/api/ventum/Lista";
            if (busqueda) {
                url = `/api/ventum/Buscar?busqueda=${busqueda}`;
            }
            const response = await axios.get(url);
            setVenta(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDescargarExcel = () => {
        // Realiza una solicitud al endpoint del servidor para descargar el archivo Excel
        fetch("/api/ventum/DescargarExcel")
            .then((response) => {
                // Verifica si la respuesta es exitosa
                if (response.ok) {
                    // Convierte la respuesta en un blob (archivo binario)
                    return response.blob();
                } else {
                    throw new Error("Error al descargar el archivo Excel.");
                }
            })
            .then((blob) => {
                // Crea una URL de objeto para el blob
                const url = window.URL.createObjectURL(blob);

                // Crea un enlace temporal para descargar el archivo
                const a = document.createElement("a");
                a.href = url;
                a.download = "ventas.xlsx";

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Limpia la URL del objeto creado
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
        mostrarVenta(value); // Muestra los clientes según el término de búsqueda
    };

    useEffect(() => {
        mostrarVenta(searchTerm);
    }, [searchTerm]);

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
        // ... c digo de inicio de sesi n ...
    };

    const handleLogout = async () => {
        try {
            // Realizar la solicitud al backend para cerrar sesi n.
            const response = await axios.post("/api/usuario/Cierre")

            if (response.status === 200) {
                console.log("Cierre de sesi n exitoso");
                setLoggedIn(false);
                setToken('');
                localStorage.removeItem('token');
                window.location.href = "/"// Eliminar el token del localStorage
            } else {
                console.log("Error al cerrar sesi n");
            }
        } catch (error) {
            console.log(token)
            console.error('Error al cerrar sesi n:', error);
        }
    };


    return (
        <div>
            <NavBar />

            <div className="card ">
                <div className="partedeltitulo">
                    <h2 className="letra">Lista de la ventas</h2>

                </div>






                <div className="card-body">
                    <div className="buscardor">
                        <form className="form-inline">
                            <input
                                className="form-control1 pequeño"
                                type="search"
                                placeholder="Buscar Venta..."
                                aria-label="Search"
                                name="searchInput"
                                value={searchTerm}
                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
                            />
                            <button className="pequeno1" type="submit">
                                <BiSearch />
                            </button>
                        </form>
                    </div>
                    <div className="btn-neon btn-agre letra2">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/venta/guardar">Agregar</a>
                    </div>

                    <table className="table1">
                        <thead>
                            <tr>

                                <th scope="col" className="raya">Cliente</th>
                                <th scope="col" className="raya">Fecha de la venta</th>
                                <th scope="col" className="raya">Total</th>
                                <th scope="col" className="raya">Operaci&#243;nes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasPaginadas.map((venta) => (
                                <tr key={venta.Id}>

                                    <td className="raya">{venta.cliente}</td>
                                    <td className="raya">{venta.fechaventa}</td>
                                    <td className="raya">{numeral(venta.total || 0).format('0,0.00')}</td>
                                    <td className="raya corto">
                                        <button className="btn espacio" onClick={() => { window.location.href = `/detalleventa/detalle/${venta.id}`; }}>
                                            <BiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <span className="totalregistros">
                        Total de registros: {venta.length}
                    </span>
                    <div style={{ marginLeft: '38px' }}>
                        <button className="btn btn-primary bajar1 my-3" onClick={handleDescargarExcel}>Descargar Excel</button>
                    </div>
                </div>
                <div className="pagination bajar">
                    <button className="btn mx-2 btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <BiChevronLeft /> Anterior
                    </button>
                    <button className="btn btn-primary" onClick={handleNextPage} disabled={ventasPaginadas.length < ventasPorPagina}>
                        Siguiente <BiChevronRight />
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}