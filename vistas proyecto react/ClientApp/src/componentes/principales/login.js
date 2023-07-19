//import "bootsrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import axios from 'axios';
import React from "react";
import '../../assets/css/menu.css';

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
                console.log("Inicio de sesión exitoso");
                window.location.href='/usuario'
                // Aquí puedes redirigir a la página de inicio de sesión exitoso
            } else {
                console.log("Credenciales inválidas. Por favor, intente nuevamente.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Usuario</p>
                    <input type="text" value={usuario} onChange={handleUsuarioChange} placeholder="Usuario" />
                </div>
                <div>
                    <p>Contraseña</p>
                    <input type="password" value={contrasena} onChange={handleContrasenaChange} placeholder="Contraseña" />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    )
}

