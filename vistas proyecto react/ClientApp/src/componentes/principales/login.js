import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import fondo2 from "../../assets/img/tiendo.jpg";
import Menu  from './menu'
import Footer  from './footer'
import { useUserContext } from './UserContext';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



export function Inicio(props) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState(''); // Agregamos un estado para mostrar mensajes de error
    const { setUserPayload } = useUserContext();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);


    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };

    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/usuario/Login", {
                Usuario1: usuario,
                Contrasena: contrasena,
            });

            if (response.status === 200) {
                const parts = response.data.token.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    const role = payload.role;

                    setUserPayload(payload);

                    if (role === 'Cliente') {
                        navigate('/vistacliente');
                    } else if (role === 'Administrador') {
                        navigate('/Dasboard');
                    }
                }
            }
        } catch (error) {
            console.error("Error:", error);

            // Mostrar mensaje de error con Swal.fire
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Credenciales incorrectas',
            });
        };
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <div>
            <Menu />
            <div className="body2">
                <center>
                    <div className="login-container" >
                        <img src={fondo2} alt="Imagen de inicio de sesión" className="login-image" />
                        <div className="box">
                            <span className="borderLine"></span>
                            <form onSubmit={handleSubmit}>
                                <h2 className="titulo">Iniciar</h2>
                                <div className="inputBox">
                                    <input type="text" value={usuario} onChange={handleUsuarioChange} required />
                                    <span>Usuario</span>
                                    <i></i>
                                </div>

                                <div className="inputBox">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={contrasena}
                                        onChange={handleContrasenaChange}
                                        required
                                    />
                                    <span>Clave</span>
                                    <i>
                                    </i></div>
                                    <div className="ojo">
                                    {showPassword ? (
        <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} className="password-toggle" />
    ) : (
        <FontAwesomeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} className="password-toggle" />
    )}
                                </div>
                                
                                




                                <div className="links">
                                    <a href="/recuperar">Olvidé mi contraseña</a>  <a href="/registarse">Registrarse</a>
                                </div>
                                <input type="submit" value="Ingresar" />

                                {error && <p className="error-message">{error}</p>} {/* Mostrar el mensaje de error si existe */}
                            </form>
                        </div>
                    </div>
                </center>
            </div>
            <Footer / >
        </div>
    );
}