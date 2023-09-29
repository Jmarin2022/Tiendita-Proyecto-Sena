import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'; // Importar los iconos de flechas
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";
import Swal from 'sweetalert2';
import ReactSwitch from 'react-switch';



import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Footer from '../principales/footer';

export function Listadousuario() {
    const [usuario, setUsuario] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usuariosPorPagina = 6;
    const [datosCargados, setDatosCargados] = useState(false);

    const [filtroActivo, setFiltroActivo] = useState('todos'); // Estado para el filtro





    const [searchTerm, setSearchTerm] = useState("");
    const [rol, setRol] = useState([]);


    const mostrarUsuarios = async (busqueda, filtro) => {
        try {
            let url = "/api/usuario/Lista";
            if (busqueda) {
                url = `/api/usuario/Buscar?busqueda=${busqueda}`;
                console.log('hola')
            }

            if (filtro === 'activos') {
                url = '/api/usuario/FiltrarActivos';
                console.log('hola1')
            } else if (filtro === 'inactivos') {
                url = '/api/usuario/FiltrarInactivos';
                console.log('hola2')
            }
            

            const response = await axios.get(url);
            setUsuario(response.data);
        } catch (error) {
            console.error(error);
        }
    };




    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements.searchInput.value;
        mostrarUsuarios(searchValue, filtroActivo);
    };


    const eliminarUsuario = async (Id) => {
        try {
            const response = await axios.delete(`/api/usuario/Eliminar/${Id}`);
            if (response.status === 200) {
                mostrarUsuarios(); // Usar el filtro actual
                setUsuarioSeleccionado(null);
                window.location.href = "/usuario";
            }
        } catch (error) {
            console.error(error);
        }
    };


    const obtenerRoles = async () => {
        const response = await fetch("/api/rol/Lista");
        if (response.ok) {
            const data = await response.json();
            setRol(data);
        } else {
            console.log("Error al obtener Roles");
        }
    };


    //useEffect(() => {
    //    const obtenerDatos = async () => {
    //        await obtenerRoles(searchTerm); // Obtener la lista de roles primero
    //        await mostrarUsuarios(searchTerm); // Luego obtener la lista de usuarios con el término de búsqueda
    //        setDatosCargados(true);
    //    };
    //    obtenerDatos();
    //}, [searchTerm]);


    useEffect(() => {
        const fetchData = async () => {
            if (filtroActivo !== '') {
                mostrarUsuarios('', filtroActivo); // Incluye el filtro de StockMin al buscar imágenes
            } else {
                mostrarUsuarios(searchTerm, filtroActivo); // Incluye el filtro de StockMin al buscar imágenes
            }
        };


        fetchData();
    }, [filtroActivo, searchTerm]);




    const obtenerRoles1 = () => {
        if (!datosCargados) {
            return []; // Retorna unf arreglo vacío si los datos no están cargados o si no hay roles
        }

        const obtenerRoles1 = usuario.map((detalle) => {
            const nombreRol = rol.find((rol2) => rol2.idRol === detalle.rol)?.rol1; // Asegúrate de usar el campo correcto para el nombre del rol
            return {
                ...detalle,
                nombreRol: nombreRol || 'Nombre noss encontrado'
            };
        });
        return obtenerRoles1;
    };


    const detallesVentaComparados = obtenerRoles1();

    const handleEliminarClick = (usuario) => {
        setUsuarioSeleccionado(usuario);
    };

    const handleConfirmarEliminar = () => {
        if (usuarioSeleccionado) {
            eliminarUsuario(usuarioSeleccionado.id);
        }
    };
    const indexOfLastUsuario = currentPage * usuariosPorPagina;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
    const usuariosPaginados = usuario.slice(indexOfFirstUsuario, indexOfLastUsuario);

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

    const handleToggleEstado = async (Id) => {
        const confirmacion = await Swal.fire({
            title: '&#191;Est&#225;s seguro?',
            title: '&#191;Quieres cambiar el estado de este usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&#237;',
            cancelButtonText: 'No',
        });

        if (confirmacion.isConfirmed) {
            const imagenSeleccionada = usuario.find((usuario) => usuario.id === Id);

            if (!imagenSeleccionada) {
                return;
            }

            // Cambia el estado local del producto (Activo o Inactivo)
            const nuevoEstado = imagenSeleccionada.estado === 'Activo' ? 'Inactivo' : 'Activo';
            imagenSeleccionada.estado = nuevoEstado;

            // Actualiza la lista local de productos
            const nuevaLista = [...usuario];
            setUsuario(nuevaLista);

            try {
                // Envía la solicitud al servidor para actualizar el estado
                const response = await axios.put(`/api/usuario/ToggleEstado/${Id}`);
                if (response.status === 200) {
                    // Muestra una alerta de SweetAlert con un mensaje según el estado
                    Swal.fire({
                        icon: 'success',
                        title: `Usuario ${nuevoEstado}`,
                        text: `El usuario se ha marcado como ${nuevoEstado}.`,
                        timer: 2000, // Cerrar automáticamente después de 2 segundos
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    };




    const handleToggleFiltro = (filtro) => {
        let nuevoFiltro = '';
        if (filtro === filtroActivo) {
            nuevoFiltro = ''; // Desactiva el filtro si se hace clic en el filtro activo
        } else {
            nuevoFiltro = filtro; // Activa el filtro si se hace clic en otro filtro
        }

        setFiltroActivo(nuevoFiltro); // Actualiza el estado de filtro

        // Llama a mostrarUsuarios con el nuevo filtro
        mostrarUsuarios(searchTerm, nuevoFiltro);
    };

    return (
        <div>
            <NavBar />

            <div className="card">
                <div className="partedeltitulo">
                    <h2 className="letra">Lista de los usuarios</h2>

                </div>




                <div className="card-body">
                    <div className="buscardor">
                        <form className="form-inline" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control1 pequeño"
                                type="search"
                                placeholder="Buscar Usuario..."
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

                        <a href="/usuario/guardar">Agregar</a>
                    </div>
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



                    </div>

                    <table className="table1">
                        <thead>
                            <tr>

                                <th scope="col" className="raya">Rol</th>
                                <th scope="col" className="raya">Documento</th>
                                <th scope="col" className="raya">Nombre del usuario</th>
                                <th scope="col" className="raya">Estado</th>
                                <th scope="col" className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuario.map((detalle) => (
                                <tr key={detalle.Id}>

                                    <td className="raya">
                                        {detalle.rol === 1 ? "Administrador" : detalle.rol === 2 ? "Cliente" : ""}
                                    </td>


                                    <td className="raya">
                                        {detalle.documento}
                                    </td>


                                    <td className="raya">{detalle.usuario1}</td>
                                    <td className="raya">
                                        {detalle.estado}
                                        <ReactSwitch
                                            className="mx-2"
                                            checked={detalle.estado === 'Activo'}
                                            onChange={() => handleToggleEstado(detalle.id)}
                                            width={40}
                                            height={18}
                                            handleDiameter={10}
                                            onColor="#007bff"
                                            offColor="#000"
                                            uncheckedIcon={false}
                                        />
                                    </td>
                                    {/*<td className="raya">{usuario.contrasena}</td>*/}
                                    <td className="raya corto">
                                        <button className="btn espacio" onClick={() => handleEliminarClick(detalle)}
                                            data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                            <BsTrash className="btn-outline-danger icon" />
                                            <AiOutlineClose className="btn-outline-danger icon-open" />
                                        </button>

                                        <button className="btn" onClick={() => {
                                            window.location.href =
                                                `/usuario/editar/${detalle.id}`;
                                        }}>
                                            <BsPencil className="iconedit" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span className="totalregistros">
                        Total de usuarios: {usuario.length}
                    </span>

                </div>


                <div className="pagination bajar">
                    <button className="btn mx-2 btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <BiChevronLeft /> Anterior
                    </button>
                    <button className="btn btn-primary" onClick={handleNextPage} disabled={usuariosPaginados.length <
                        usuariosPorPagina}>
                        Siguiente
                        <BiChevronRight />
                    </button>
                </div>

                <Modal usuarioSeleccionado={usuarioSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
            <Footer />
        </div>





    );
}