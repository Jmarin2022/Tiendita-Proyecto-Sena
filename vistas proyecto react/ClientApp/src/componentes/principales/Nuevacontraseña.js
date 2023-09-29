import fondo2 from "../../assets/img/tiendo.jpg";
import { useState } from 'react';

export function Nuevacontraseña(){
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');


    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };
    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    };



    return(
        <div className="body2">
            <center>
                <div className="login-container">
                    <img src={fondo2} alt="Imagen de inicio de sesi�n" className="login-image" />
                <div className="box">
                    <span className="borderLine"></span>
                    <form >
                        <h2 className="titulo">Iniciar</h2>
                        <div className="inputBox">
                            <input type="text" value={usuario} onChange={handleUsuarioChange} required />
                            <span>nueva contraseña</span>
                            <i></i>
                        </div>

                        <div className="inputBox">
                            <input type="password" value={contrasena} onChange={handleContrasenaChange} required />
                            <span>nueva contraseña</span>
                            <i></i>
                        </div>

                        <input type="submit" value="Cambiar" />

                    </form>
                    </div>
                </div>

            </center>
        </div>
    )
}