import { useState } from 'react';

import axios from 'axios';
import React from "react";
import '../../assets/css/menu.css';
import '../../assets/css/login.css';
/*import Logo from '../../assets/img/logo_tiendita.png';*/

export function Inicio(props) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

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
                Contrasena: contrasena
            });

            if (response.status === 200) {
                console.log("Inicio de sesi�n exitoso");
                window.location.href = '/usuario';
                // Aqu� puedes redirigir a la p�gina de inicio de sesi�n exitoso
            } else {
                console.log("Credenciales inv�lidas. Por favor, intente nuevamente.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="body2">
            <center>
                <div className="box">
                    <span className="borderLine"></span>
                    <form onSubmit={handleSubmit}>
                        <h2 className="titulo">Iniciar</h2>
                        <div className="inputBox">
                            <input type="text" value={usuario} onChange={handleUsuarioChange} required />
                            <span>Correo</span>
                            <i></i>
                        </div>

                        <div className="inputBox">
                            <input type="password" value={contrasena} onChange={handleContrasenaChange} required />
                            <span>Clave</span>
                            <i></i>
                        </div>

                        <div className="links">
                            <a href="#">Olvid� mi contrase�a</a>  <a href="#">Registrarse</a>
                        </div>
                        <input type="submit" value="Ingresar" />

                    </form>
                </div>

            </center>
        </div>
    )
}
