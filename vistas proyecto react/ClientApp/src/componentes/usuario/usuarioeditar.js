
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../principales/navbar";
import "../../assets/css/menu.css";
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UsuarioEditar = () => {
    const { id } = useParams();
    const [roles, setRoles] = useState([]);
   

    const [usuario, setusuario] = useState({
        usuario1: "",
        contrasena: "",
        rol: "",
        documento: "",
        estado: '',
    });

    useEffect(() => {
        cargarusuario();
        cargarRoles();
    }, []);

    const cargarusuario = async () => {
        try {
            const response = await axios.get(`/api/usuario/${id}`);
            setusuario(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarRoles = async () => {
        try {
            const response = await axios.get('/api/rol/Lista');
            setRoles(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setusuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*Verifica si algún campo está vacío*/
        

        try {
            await axios.put(`/api/usuario/Editar/${id}`, usuario);
            window.location.href = `/usuario`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="modal-content">
                <div className="contenidointeriorusuario">
                    
                    <form className="row g-2" onSubmit={handleSubmit}>
                        <h2>Editar Usuario</h2>
                            <label class="" htmlFor="rol">Rol:</label>
                            <div className="col-md-12">
                           
                                <select
                                className="form-select form-select-sm"
                                    id="rol"
                                    name="rol"
                                    value={usuario.rol}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un rol</option>
                                    {roles.map((role) => (
                                        <option key={role.idRol} value={role.idRol}>
                                            {role.rol1}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className="col-md-12">
                            <label class="form-label" htmlFor="documento">Documento:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="documento"
                                name="documento"
                                value={usuario.documento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-12">
                            <label class="form-label" htmlFor="usuario1">Usuario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usuario1"
                                    name="usuario1"
                                    value={usuario.usuario1}
                                    onChange={handleChange}
                                />
                            </div>
                        <div className="col-md-12">
                            <label class="form-label"  htmlFor="contrasena">Contraseña:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contrasena"
                                    name="contrasena"
                                    value={usuario.contrasena}
                                    onChange={handleChange}
                                />
                        </div>

                        <div class="col-md-6">
                            <label>Estado</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="estadoActivo"
                                    name="estadoActivo"
                                    checked={usuario.estado === 'Activo'}
                                    onChange={() => setusuario({ ...usuario, estado: 'Activo' })}
                                />
                                <label className="form-check-label" htmlFor="estadoActivo">
                                    Activo
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="estadoInactivo"
                                    name="estadoInactivo"
                                    checked={usuario.estado === 'Inactivo'}
                                    onChange={() => setusuario({ ...usuario, estado: 'Inactivo' })}
                                />
                                <label className="form-check-label" htmlFor="estadoInactivo">
                                    Inactivo
                                </label>
                            </div>
                        </div>

                        
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="btn btn-primary" type="submit">Guardar</button>
                            <Link to="/usuario" className="btn btn-primarycancelar bajar1 my-3 mx-3 ">Cancelar</Link >
                           
                       </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
