import { useState, useEffect } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../principales/UserContext'
import fondo2 from "../../assets/img/tiendo.jpg";
import '../../assets/css/login.css';
import { Link, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2'; // Importa SweetAlert

export function Resgistrarse() {
    const [usuario1, setUsuario1] = useState('');
    const [contrasena, setcontrasena1] = useState('');
    const [contrasena2, setcontrasena2] = useState('');
    const [Documento, setdocumento] = useState('');
    const [rol, setrol] = useState('');
    const [estado, setestado] = useState('');

    const handleUsuario1Change = (e) => {
        setUsuario1(e.target.value);
    };
    const handleContrasena1Change = (e) => {
        setcontrasena1(e.target.value);
    };
    const handleContrasena2Change = (e) => {
        setcontrasena2(e.target.value);
    };
    const handleDocumentoChange = (e) => {
        setdocumento(e.target.value);
    };

    const submitHandler = (e) => {


        e.preventDefault();
        if (!usuario1 || !contrasena || !contrasena2 || !Documento) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }


        if (contrasena !== contrasena2) {
            console.log("Las contraseñas no coinciden");
            return; // No se envía la solicitud si las contraseñas no coinciden
        }
        const userData = { usuario1, contrasena, Documento, rol, estado };
        userData.rol = 2
        userData.estado = 'Activo'
        console.log(userData);
        axios.post('api/usuario/Guardar', userData)
            .then(response => {
                console.log(response);
                window.location.href = "/login";
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="body2">
            <center>
                <div className="login-container">
                    <img src={fondo2} alt="Imagen de inicio de sesi n" className="login-imageR" />
                    <div className="box2">

                        <form onSubmit={submitHandler} className="row g-2" style={{ pading: '0px' }}>
                            <h2 className="titulo">Registrar</h2>
                            <div className="col-md-12">
                                <span className="tituloRegistrar">Documento </span>
                                <input className="form-control" type="number" name="celular" value={Documento} onChange={handleDocumentoChange} />
                            </div>

                            <div className="col-md-12">
                                <span className="tituloRegistrar">Usuario</span>
                                <input type="text" name="usuario1" className="form-control" value={usuario1} onChange={handleUsuario1Change} />

                                <i></i>
                            </div>
                            <div className="col-md-12">
                                <span className="tituloRegistrar">Contraseña</span>
                                <input type="password" className="form-control" name="contrasena" value={contrasena} onChange={handleContrasena1Change} />

                                <i></i>
                            </div>
                            <div className="col-md-12">
                                <span className="tituloRegistrar">Confirmar Contraseña</span>
                                <input className="form-control" type="password" name="contrasena" value={contrasena2} onChange={handleContrasena2Change} />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                               
                                <button type="submit" className="btn btn-primary bajar1 my-3">Registrar</button>
                                <Link to="/login" className="btn btn-primarycancelar bajar1 my-3 mx-3 ">Cancelar</Link >
                            </div>
                        </form>
                    </div>
                </div>

            </center>
        </div>
    )
}