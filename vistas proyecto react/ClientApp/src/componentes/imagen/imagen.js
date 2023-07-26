import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";

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
                        <h2 className="letra">Lista de los productos</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/imagen/guardar">Agregar</a>
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
