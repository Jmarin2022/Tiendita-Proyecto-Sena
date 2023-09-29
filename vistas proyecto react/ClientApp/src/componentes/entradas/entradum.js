import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiSearch } from 'react-icons/bi'; // Importar los iconos de flechas
import '../../assets/css/menu.css';
import { NavBar } from '../principales/navbar';
import { Modal } from "./Modal";

import { AiOutlineClose } from 'react-icons/ai';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Footer from '../principales/footer';

export function Listadoentradum() {
    const [entradums, setentradums] = useState([]);
    const [entradumSeleccionado, setentradumSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const entradasPorPagina = 12;

    const [datosCargados, setDatosCargados] = useState(false);
    const [imagenes, setImagenes] = useState([]);

    const [searchTerm, setSearchTerm] = useState(""); 


   

    const mostrarentradums = async (busqueda) => {
        try {
            let url = "/api/entradum/Lista";
            if (busqueda) {
                url = `/api/entradum/Buscar?busqueda=${busqueda}`;
            }
            const response = await axios.get(url);
            setentradums(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        mostrarentradums(searchValue);
    };

    const handleDescargarExcel = () => {
        // Realiza una solicitud al endpoint del servidor para descargar el archivo Excel
        fetch("/api/entradum/DescargarExcel")
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
                a.download = "entradas.xlsx";

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Limpia la URL del objeto creado
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
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

    const obtenerImagenes = async () => {
        const response = await fetch("/api/imagen/Lista");
        if (response.ok) {
            const data = await response.json();
            setImagenes(data);
        } else {
            console.log("Error al obtener Imagenes");
        }
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            await mostrarentradums(searchTerm);
            await obtenerImagenes(searchTerm);
            setDatosCargados(true);
        }; obtenerDatos();
    }, [searchTerm]);

    const obtenerRoles1 = () => {
        if (!datosCargados) {
            return []; // Retorna un arreglo vacío si los datos no están cargados o si no hay roles
        }

        const detallesVentaComparados = entradums.map((detalle) => {
            const nombreProducto = imagenes.find((imagen2) => imagen2.idImagen === detalle.idProductos)?.nombre; // Asegúrate de usar el campo correcto para el nombre del rol
            return {
                ...detalle,
                nombreProducto: nombreProducto || 'Nombre  encontrado'
            };
        });
        return detallesVentaComparados;

    };
    const detallesVentaComparados = obtenerRoles1();

    return (
        <div>
            <NavBar />
            
                <div className="card ">
                    
                    <div className="partedeltitulo">
                        <h2 className="letra">Lista de las entradas</h2>
                        
                </div>

                
                    
                    <div className="card-body">
                    <div className="buscardor">
                        <form className="form-inline" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control1 pequeño"
                                type="search"
                                placeholder="Buscar Entrada..."
                                aria-label="Search"
                                name="searchInput"
                                value={searchTerm} // Agregar este atributo value
                                onChange={(e) => setSearchTerm(e.target.value)} // Agregar este evento onChange
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
                        <a href="/entradas/guardar">Agregar</a>
                    </div>
                    <table className="table1">
                        <thead>
                            <tr>
                                {/*<th scope="col " className="raya">Id entradum</th>*/}
                                <th scope="col " className="raya">Producto</th>
                                <th scope="col " className="raya">Cantidad</th>
                                <th scope="col " className="raya">Proveedor</th>
                                <th scope="col " className="raya">Fecha Registro</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {detallesVentaComparados.map((detalle) => (
                                <tr key={detalle.IdEntrada}>
                                    {/*<td className="raya">{entradum.idEntrada}</td>*/}
                                    <td className="raya">{detalle.nombreProducto}</td>
                                    <td className="raya">{detalle.cantidad}</td>
                                    <td className="raya">{detalle.proveedor}</td>
                                    <td className="raya">{formatDate(detalle.fecha)}</td>
                                   
                                </tr>
                            ))} 
                        </tbody>
                    </table>

                    <span className="totalregistros">
                        Total de registros: {entradums.length}
                    </span>
                    
                </div>
                <div style={{ marginLeft: '48px' }}>
                    <button className="btn btn-primary bajar1 my-3" onClick={handleDescargarExcel}>Descargar Excel</button>
                </div>

                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn mx-2 btn-primary" onClick={handleNextPage} disabled={entradasPaginadas.length < entradasPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                </div>
                {/* Modal para confirmar la eliminación */}
                <Modal entradumSeleccionado={entradumSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
            <Footer />
        </div>
    );
}
