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
                console.log("Inicio de sesi�n exitoso");
                window.location.href='/usuario'
                // Aqu� puedes redirigir a la p�gina de inicio de sesi�n exitoso
            } else {
                console.log("Credenciales inv�lidas. Por favor, intente nuevamente.");
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
                    <p>Contrase�a</p>
                    <input type="password" value={contrasena} onChange={handleContrasenaChange} placeholder="Contrase�a" />
                </div>
                <button type="submit">Iniciar sesi�n</button>
            </form>
        </div>
    )
}

