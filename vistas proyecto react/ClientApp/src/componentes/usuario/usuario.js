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
export function Listadousuario() {
    const [usuario, setUsuario] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usuariosPorPagina = 12;

    const mostrarUsuarios = async () => {
        try {
            const response = await axios.get("/api/usuario/Lista");
            setUsuario(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarUsuario = async (Id) => {
        try {
            const response = await axios.delete(`/api/usuario/Eliminar/${Id}`);
            if (response.status === 200) {
                mostrarUsuarios();
                setUsuarioSeleccionado(null);
                window.location.href = "/usuario";
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarUsuarios();
    }, []);

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

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1 ">
                        <div className="Titulo12">
                            <h2 className="letra12">Juan <BsPerson /></h2>
                        </div>
                    </div>

                    <div className="partedeltitulo">
                        <h2 className="letra">Lista de los usuarios</h2>
                        <div className="btn-neon letra2">
                            <span id="span1"></span>
                            <span id="span2"></span>
                            <span id="span3"></span>
                            <span id="span4"></span>
                            <a href="/usuario/guardar">Agregar</a>
                        </div>
                    </div>
                    <div className="reducir  " >
                        <input type="search" className="form-control1" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span class="input-group-text border-0 pegado" id="search-addon">
                            <BiSearch />
                        </span>
                    </div>


                    <div className="card-body">
                        <div className="">
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th scope="col" className="raya">Id usuario</th>
                                        <th scope="col" className="raya">Rol</th>
                                        <th scope="col" className="raya">Nombre del usuario</th>
                                        <th scope="col" className="raya">Contraseña</th>
                                        <th scope="col" className="raya">Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuariosPaginados.map((usuario) => (
                                        <tr key={usuario.Id}>
                                            <td className="raya">{usuario.id}</td>
                                            <td className="raya">{usuario.rol}</td>
                                            <td className="raya">{usuario.usuario1}</td>
                                            <td className="raya">{usuario.contrasena}</td>
                                            <td className="raya corto">
                                                <button className="btn btn-outline-danger espacio" onClick={() => handleEliminarClick(usuario)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">
                                                    <BiTrash />
                                                </button>
                                                <button className="btn btn-primary espacio" onClick={() => { window.location.href = `/usuario/editar/${usuario.id}`; }}>
                                                    <BiBrush />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal usuarioSeleccionado={usuarioSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
                    <div className="pagination bajar">
                        <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <BiChevronLeft /> Anterior
                        </button>
                        <button className="btn btn-primary" onClick={handleNextPage} disabled={usuariosPaginados.length < usuariosPorPagina}>
                            Siguiente <BiChevronRight />
                        </button>
                    </div>
                </div>
                

                
            </div>
        </div>
    );
}
