import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fondo2 from "../../assets/img/tiendo.jpg";
import { useUserContext } from './UserContext';

export const Recuperar = () => {
    const { setUserPayload } = useUserContext();
    const [responseMessage, setResponseMessage] = useState('');
    const [userData, setUserData] = useState([]);
    const [usuario, setUsername] = useState('');
    const [documento, setDocumento] = useState();

    useEffect(() => {
        // Cargar la lista de usuarios al montar el componente
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await axios.get('/api/usuario/Lista');
            console.log(response.data)
            setUserData(response.data);
        } catch (error) {
            console.error('Error al llamar la lista:', error);
        }
    };

    const handleSendSMS = async () => {
        try {
            const user = userData.find(user => user.usuario1 === usuario);
            const docu = userData.find(docu => docu.documento == documento);
            const rol = user.rol
            const id = user.id
            if (!user) {

                alert('No se encontro un usuario');
                return;
            }

            if (!docu) {
                console.log(docu + '  ' + documento)
                alert('No se encontro un Documento');
                return;
            }
            const array = [
                usuario,
                documento,
                rol,
                id
            ]
            setUserPayload(array)
            window.location.href = '/digitarNumero';
        } catch (error) {
            console.error('Eror al enviar el mensaje:', error);
        }
    };

    return (
        <div className="body2">
            <center>
                <div className="login-container">
                    <img src={fondo2} alt="Imagen de inicio de sesi n" className="login-image" />
                    <div className="box">
                        <span className="borderLine"></span>
                        <form>
                            <div className='inputBox'>
                                <input type="text" value={usuario} onChange={(e) => setUsername(e.target.value)} required />
                                <span>  Usuario</span>
                                <i></i>
                            </div>
                            <div className='inputBox'>
                                <input type="number" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
                                <span>  Documento</span>
                                <i></i>
                            </div>
                            <div class="links">
                                <a onClick={handleSendSMS}>Validar</a>
                                <a href="/login">Volver</a>
                            </div>
                        </form>



                        {responseMessage && <div>{responseMessage}</div>}
                    </div>

                </div>
            </center>


        </div>
    );
};