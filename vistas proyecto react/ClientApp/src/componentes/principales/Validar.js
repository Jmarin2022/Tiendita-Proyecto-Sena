import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fondo2 from "../../assets/img/tiendo.jpg";
import { useUserContext } from './UserContext';

export const DigitarNumero = () => {
    const { userPayload, setUserPayload } = useUserContext();
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const [celular, setCelular] = useState('');

    const array2 = userPayload

    console.log(array2)

    const handleSendSMS = async () => {
        try {
            if (celular.length == 13) {
                alert('el numero de celular no coincide')
                return
            }

            // Generar número aleatorio de 6 dígitos
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            setMessage(randomCode.toString()); // Usar el código aleatorio
            const payload = randomCode
            const response = await axios.post('/api/usuario/send-sms', {
                to: '+57' + celular,
                body: randomCode.toString()
            });
            setUserPayload(null);
            array2.push(randomCode)
            setUserPayload(array2)
            console.log('mensaje enviado')
            setResponseMessage(response.data.Message);
            window.location.href = '/validarcodigo';
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
                                <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} required />
                                <span>Celular</span>
                                <i></i>
                            </div>

                            <div class="links">
                                <a onClick={handleSendSMS}>Enviar Mensaje</a>
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