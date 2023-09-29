import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Importa useHistory
import { useUserContext } from "../principales/UserContext";
import "../../assets/css/login.css";
import fondo2 from "../../assets/img/tiendo.jpg";
import Menu from "./menu";
import Footer from "./footer";

export function CambiarContraseña() {
    const [inputValue, setInputValue] = useState(); // Estado para el valor ingresado en el input
    const { userPayload, setUserPayload } = useUserContext();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        var numero = parseInt(inputValue, 10);
        console.log(numero)
        if (numero === userPayload[4]) {
            window.location.href = "/cambiar";
        } else {
            alert("Código incorrecto");
        }
    };

    return (
        <div>
            <Menu />
            <div className="body2">
                <center>
                    <div className="login-container">
                        <img
                            src={fondo2}
                            alt="Imagen de inicio de sesi n"
                            className="login-image"
                        />
                        <div className="box">
                            <span className="borderLine"></span>
                            <form onSubmit={handleFormSubmit}>
                                <h2 className="titulo">Iniciar</h2>
                                <div className="inputBox">
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        required />
                                    <span>Digite el codigo</span>
                                    <i></i>
                                </div>
                                <input type="submit" style={{ float: 'left', marginLeft: '0px' }} value="Validar" />
                            </form>
                        </div>
                    </div>
                </center>
            </div>
            <Footer />
        </div>
    );
}