//import { useEffect, useState } from 'react';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import { Modal } from "./Modal";
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'
//import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
//import { BiBrush } from 'react-icons/bi';
//import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas
//import { BsPerson } from 'react-icons/bs';
//import { BiSearch } from "react-icons/bi";

//import { BsTrash } from 'react-icons/bs';
//import { BsPencil } from 'react-icons/bs';
//import { AiOutlineClose } from 'react-icons/ai';
//import Footer from '../principales/footer';

//export function Listadoimagen() {
//    const [imagen, setimagen] = useState([]);
//    const [imagenSeleccionado, setimageneleccionado] = useState(null);
//    const [currentPage, setCurrentPage] = useState(1);
//    const itemsPerPage = 12;

//    const [searchTerm, setSearchTerm] = useState("");



//    const mostrarimagen = async (busqueda) => {
//        try {
//            let url = "/api/imagen/Lista";
//            if (busqueda) {
//                url = `/api/imagen/Buscar?busqueda=${busqueda}`;
//            }
//            const response = await axios.get(url);
//            setimagen(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleSearchChange = (e) => {
//        const value = e.target.value;
//        setSearchTerm(value); // Actualiza el término de búsqueda en el estado
//        mostrarimagen(value); // Muestra los clientes según el término de búsqueda
//    };

//    const handleSearchSubmit = (e) => {
//        e.preventDefault();
//        const searchValue = e.target.elements.searchInput.value;
//        mostrarimagen(searchValue);
//    };


//    const eliminarimagen = async (IdImagen) => {
//        try {
//            const response = await axios.delete(`/api/imagen/Eliminar/${IdImagen}`);
//            if (response.status === 200) {
//                mostrarimagen();
//                setimageneleccionado(null);
//                window.location.href = "/imagen";
//            }
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    useEffect(() => {
//        mostrarimagen(searchTerm);
//    }, [searchTerm]);

//    const handleEliminarClick = (imagen) => {
//        setimageneleccionado(imagen);
//    };

//    const handleConfirmarEliminar = () => {
//        if (imagenSeleccionado) {
//            eliminarimagen(imagenSeleccionado.idImagen);
//        }
//    };

//    const handleNextPage = () => {
//        setCurrentPage(currentPage + 1);
//    };

//    const handlePrevPage = () => {
//        setCurrentPage(currentPage - 1);
//    };

//    const indexOfLastItem = currentPage * itemsPerPage;
//    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//    const currentItems = imagen.slice(indexOfFirstItem, indexOfLastItem);

//    const [loggedIn, setLoggedIn] = useState(false);
//    const [token, setToken] = useState('');

//    const handleLogin = async (username, password) => {
//        // ... código de inicio de sesión ...
//    };

//    const handleLogout = async () => {
//        try {
//            // Realizar la solicitud al backend para cerrar sesión.
//            const response = await axios.post("/api/usuario/Cierre")

//            if (response.status === 200) {
//                console.log("Cierre de sesión exitoso");
//                setLoggedIn(false);
//                setToken('');
//                localStorage.removeItem('token');
//                window.location.href = "/"// Eliminar el token del localStorage
//            } else {
//                console.log("Error al cerrar sesión");
//            }
//        } catch (error) {
//            console.log(token)
//            console.error('Error al cerrar sesión:', error);
//        }
//    };

//    return (
//        <div>
//            <NavBar />

//                <div className="card ">

//                    <div className="partedeltitulo">
//                        <h2 className="letra">Lista de los productos</h2>

//                </div>


//                <div className="card-body">
//                    <div className="buscardor">
//                        <form className="form-inline">
//                            <input
//                                className="form-control1 pequeño"
//                                type="search"
//                                placeholder="Buscar Producto..."
//                                aria-label="Search"
//                                name="searchInput"
//                                value={searchTerm}
//                                onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
//                            />
//                            <button className="pequeno1" type="submit">
//                                <BiSearch />
//                            </button>
//                        </form>
//                    </div>


//                    <div className="btn-neon btn-agre letra2">
//                        <span id="span1"></span>
//                        <span id="span2"></span>
//                        <span id="span3"></span>
//                        <span id="span4"></span>
//                        <a href="/imagen/guardar">Agregar</a>
//                    </div>

//                    <table className="table1">
//                        <thead>
//                            <tr>
//                                {/*<th scope="col" className="raya">Id imagen</th>*/}
//                                <th scope="col" className="raya">Nombre</th>
//                                <th scope="col" className="raya">Stock</th>
//                                <th scope="col" className="raya">Precio</th>
//                                <th scope="col" className="raya">Categoria</th>
//                                <th scope="col" className="raya">StockMax</th>
//                                <th scope="col" className="raya">StockMin</th>
//                                <th scope="col" className="raya">Estado</th>
//                                {/*<th scope="col" className="raya">Imagen1</th>*/}
//                                <th scope="col" className="raya">Operaciones</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {currentItems.map((imagen) => (
//                                <tr key={imagen.IdImagen}>
//                                   {/* <td className="raya">{imagen.idImagen}</td>*/}
//                                    <td className="raya">{imagen.nombre}</td>
//                                    <td className="raya">{imagen.stock}</td>
//                                    <td className="raya">{imagen.precio}</td>
//                                    <td className="raya">{imagen.categoria}</td>
//                                    <td className="raya">{imagen.stockMax}</td>
//                                    <td className="raya">{imagen.stockMin}</td>
//                                    <td className="raya">{imagen.estado}</td>
//                                    {/*<td className="raya">{imagen.imagen1}</td>*/}
//                                    <td className="raya corto">
//                                        <button className="btn espacio" onClick={() => handleEliminarClick(imagen)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
//                                            <BsTrash className="btn-outline-danger icon" />
//                                            <AiOutlineClose className="btn-outline-danger icon-open" />
//                                        </button>
//                                        <button
//                                            className="btn  "
//                                            onClick={() => { window.location.href = `/imagen/editar/${imagen.idImagen}`; }}
//                                        >
//                                            <BsPencil className="iconedit" />
//                                        </button>
//                                        <button className="btn espacio" onClick={() => { window.location.href = `/imagen/detalle/${imagen.idImagen}`; }}>
//                                            <BiChevronRight />
//                                        </button>
//                                    </td>
//                                </tr>
//                            ))}


//                        </tbody>
//                    </table>
//                    <span className="totalregistros">
//                        Total de registros: {imagen.length}
//                    </span>
//                </div>

//                    <div className="pagination bajar">
//                        <button className="btn mx-2 btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
//                            <BiChevronLeft /> Anterior
//                        </button>
//                        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>
//                            Siguiente <BiChevronRight />
//                        </button>
//                </div>
//                {/* Modal para confirmar la eliminación */}
//                <Modal imagenSeleccionado={imagenSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
//            </div>
//            <Footer />
//        </div>
//    );
//}



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from './Modal';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiTrash } from 'react-icons/bi';
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Switch } from 'react-bootstrap'; // Importa el componente Switch
import Footer from '../principales/footer';
import ReactSwitch from 'react-switch';
import Swal from 'sweetalert2';

import numeral from 'numeral';

export function Listadoimagen() {
    const [imagen, setimagen] = useState([]);
    const [imagenSeleccionado, setimageneleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [filtroActivo, setFiltroActivo] = useState('todos'); // Estado para el filtro

    const [searchTerm, setSearchTerm] = useState("");

    const [filtroStockMin, setFiltroStockMin] = useState(false); // Estado para el filtro de StockMin





    //const mostrarimagen = async (busqueda, filtro) => {
    //    try {
    //        let url = '/api/imagen/Lista';
    //        if (busqueda) {
    //            url = `/api/imagen/Buscar?busqueda=${busqueda}`;
    //        }
    //        if (filtro === 'activos') {
    //            url = '/api/imagen/FiltrarActivos';
    //        } else if (filtro === 'inactivos') {
    //            url = '/api/imagen/FiltrarInactivos';
    //        }
    //        const response = await axios.get(url);


    //        setimagen(response.data);
    //    } catch (error) {
    //        console.error(error);
    //    }
    //};


    const mostrarimagen = async (busqueda, filtro, filtroStockMin) => {
        try {
            let url = '/api/imagen/Lista';
            if (busqueda) {
                url = `/api/imagen/Buscar?busqueda=${busqueda}`;
            }
            if (filtro === 'activos') {
                url = '/api/imagen/FiltrarActivos';
            } else if (filtro === 'inactivos') {
                url = '/api/imagen/FiltrarInactivos';
            }
            const response = await axios.get(url);
            // Filtra las imágenes que cumplan con la condición de StockMin si el filtro está activado
            const filteredImagen = filtroStockMin
                ? response.data.filter((imagen) => imagen.stock <= imagen.stockMin)
                : response.data;

            setimagen(filteredImagen);
        } catch (error) {
            console.error(error);
        }
    };


    const handleToggleFiltroStockMin = () => {
        setFiltroStockMin(!filtroStockMin);
    };



    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        mostrarimagen(searchValue, filtroActivo); // Usar el filtro actual
    };

    const eliminarimagen = async (IdImagen) => {
        try {
            const response = await axios.delete(`/api/imagen/Eliminar/${IdImagen}`);
            if (response.status === 200) {
                mostrarimagen('', filtroActivo); // Usar el filtro actual
                setimageneleccionado(null);
                window.location.href = '/imagen';
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleEstado = async (IdImagen) => {
        const confirmacion = await Swal.fire({
            title: '&#191;Est&#225;s seguro?',
            title: '&#191;Quieres cambiar el estado de este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&#237;',
            cancelButtonText: 'No',
        });

        if (confirmacion.isConfirmed) {
            const imagenSeleccionada = imagen.find((imagen) => imagen.idImagen === IdImagen);

            if (!imagenSeleccionada) {
                return;
            }

            // Cambia el estado local del producto (Activo o Inactivo)
            const nuevoEstado = imagenSeleccionada.estado === 'Activo' ? 'Inactivo' : 'Activo';
            imagenSeleccionada.estado = nuevoEstado;

            // Actualiza la lista local de productos
            const nuevaLista = [...imagen];
            setimagen(nuevaLista);

            try {
                // Envía la solicitud al servidor para actualizar el estado
                const response = await axios.put(`/api/imagen/ToggleEstado/${IdImagen}`);
                if (response.status === 200) {
                    // Muestra una alerta de SweetAlert con un mensaje según el estado
                    Swal.fire({
                        icon: 'success',
                        title: `Producto ${nuevoEstado}`,
                        text: `El producto se ha marcado como ${nuevoEstado}.`,
                        timer: 2000, // Cerrar automáticamente después de 2 segundos
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    //useEffect(() => {
    //    const fetchData = async () => {
    //        if (filtroActivo !== '') {
    //            mostrarimagen('', filtroActivo); // Usar el filtro actual al cargar la página
    //        } else {
    //            mostrarimagen(searchTerm);
    //        }
    //    };

    //    fetchData();
    //}, [filtroActivo, searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            if (filtroActivo !== '') {
                mostrarimagen('', filtroActivo, filtroStockMin); // Incluye el filtro de StockMin al buscar imágenes
            } else {
                mostrarimagen(searchTerm, filtroActivo, filtroStockMin); // Incluye el filtro de StockMin al buscar imágenes
            }
        };

        fetchData();
    }, [filtroActivo, searchTerm, filtroStockMin]);




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


const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Actualiza el término de búsqueda en el estado
    mostrarimagen(value); // Muestra los clientes según el término de búsqueda
};

    const handleToggleFiltro = (filtro) => {
        if (filtro === filtroActivo) {
            setFiltroActivo(''); // Desactiva el filtro si se hace clic en el filtro activo
        } else {
            setFiltroActivo(filtro); // Activa el filtro si se hace clic en otro filtro
        }
    };


    //const sortedImagen = [...imagen].sort((a, b) => {
    //    if (a.stock <= a.stockMin && b.stock <= b.stockMin) {
    //        return 0; // Ambos tienen stock bajo, no cambia el orden relativo.
    //    }
    //    if (a.stock <= a.stockMin) {
    //        return -1; // a tiene stock bajo, va antes en la lista.
    //    }
    //    if (b.stock <= b.stockMin) {
    //        return 1; // b tiene stock bajo, va antes en la lista.
    //    }
    //    return 0; // Ninguno tiene stock bajo, no cambia el orden relativo.
    //});

    return (
        <div>
            <NavBar />
            <div className="card ">
                <div className="partedeltitulo">
                    <h2 className="letra">Lista de los productos</h2>
                </div>
                <div className="card-body">

               <div className="buscardor">
<form className="form-inline">
    <input
        className="form-control1 pequeño"
        type="search"
        placeholder="Buscar Producto..."
        aria-label="Search"
        name="searchInput"
        value={searchTerm}
        onChange={handleSearchChange} // Agrega el controlador de eventos para la entrada
                            />

                           
    <button className="pequeno1" type="submit">
        <BiSearch />
    </button>
</form>
                    </div >                    

                    <div className="filtro-estado">
                        <label className="mx-2">Filtrar por estado:  </label>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="todos"
                                value="todos"
                                checked={filtroActivo === 'todos'}
                                onChange={() => handleToggleFiltro('todos')}
                            />
                            <label className="form-check-label" htmlFor="todos">
                                Todos
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="activos"
                                value="activos"
                                checked={filtroActivo === 'activos'}
                                onChange={() => handleToggleFiltro('activos')}
                            />
                            <label className="form-check-label" htmlFor="activos">
                                Activos
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroEstado"
                                id="inactivos"
                                value="inactivos"
                                checked={filtroActivo === 'inactivos'}
                                onChange={() => handleToggleFiltro('inactivos')}
                            />
                            <label className="form-check-label" htmlFor="inactivos">
                                Inactivos
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            {/* Checkbox para el filtro de StockMin */}
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="filtroStockMin"
                                id="stockMin"
                                checked={filtroStockMin}
                                onChange={handleToggleFiltroStockMin}
                            />
                            <label className="form-check-label" htmlFor="stockMin">
                                StockMin
                            </label>
                        </div>


                        <div className="btn-neon btn-agre letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/imagen/guardar">Agregar</a>
                        </div>
                    </div>

                    <table className="table1">
                        <thead>
                            <tr>
                                <th scope="col" className="raya">
                                    Nombre
                                </th>
                                <th scope="col" className="raya">
                                    Stock
                                </th>
                                <th scope="col" className="raya">
                                    Precio
                                </th>
                                <th scope="col" className="raya">
                                    Categoria
                                </th>
                                <th scope="col" className="raya">
                                    StockMax
                                </th>
                                <th scope="col" className="raya">
                                    StockMin
                                </th>
                                <th scope="col" className="raya" style={{ textAlign: 'center' }}>
                                    Estado
                                </th>
                                <th scope="col" className="raya">
                                    Operaci&#243;nes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((imagen) => (
                                <tr
                                    key={imagen.idImagen}
                                    className={`${imagen.stock <= imagen.stockMin ? 'fila-roja-transparente' : ''} ${imagen.stock >= imagen.stockMax ? 'fila-amarillo-transparente' : ''}`}

                                >
                                    <td className="raya">{imagen.nombre}</td>
                                    <td className="raya">{imagen.stock}</td>
                                    <td className="raya">{numeral(imagen.precio || 0).format('0,0.00')}</td>
                                    <td className="raya">{imagen.categoria}</td>
                                    <td className="raya">{imagen.stockMax}</td>
                                    <td className="raya">{imagen.stockMin}</td>
                                    <td className="raya">
                                        {imagen.estado}
                                        <ReactSwitch
                                            className="mx-2"
                                            checked={imagen.estado === 'Activo'}
                                            onChange={() => handleToggleEstado(imagen.idImagen)}
                                            width={40}
                                            height={18}
                                            handleDiameter={10}
                                            onColor="#007bff"
                                            offColor="#000"
                                            uncheckedIcon={false}
                                        />
                                    </td>
                                    <td className="raya corto">
                                        <button
                                            className="btn espacio"
                                            onClick={() => handleEliminarClick(imagen)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#confirmarEliminarModal"
                                        >
                                            <BsTrash className="btn-outline-danger icon" />
                                            <AiOutlineClose className="btn-outline-danger icon-open" />
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                window.location.href = `/imagen/editar/${imagen.idImagen}`;
                                            }}
                                        >
                                            <BsPencil className="iconedit" />
                                        </button>
                                        <button
                                            className="btn espacio"
                                            onClick={() => {
                                                window.location.href = `/imagen/detalle/${imagen.idImagen}`;
                                            }}
                                        >
                                            <BiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination bajar">
                    <button className="btn mx-2 btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <BiChevronLeft /> Anterior
                    </button>
                    <button className="btn btn-primary" onClick={handleNextPage} disabled={currentItems.length < itemsPerPage}>
                        Siguiente <BiChevronRight />
                    </button>
                </div>
                <Modal imagenSeleccionado={imagenSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
            <Footer />
        </div>
    );
}