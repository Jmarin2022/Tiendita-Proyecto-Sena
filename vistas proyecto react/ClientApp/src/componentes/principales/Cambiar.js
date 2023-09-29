import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import fondo2 from "../../assets/img/tiendo.jpg";
import Menu from "./menu";
import Footer from "./footer";
import { useUserContext } from "./UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export function Cambiar() {
    const { id } = useParams();
    const { userPayload, setUserPayload } = useUserContext();
    const [userData, setUserData] = useState([]);

    const [usuario, setusuario] = useState({
        usuario1: userPayload[0],
        contrasena: "",
        rol: userPayload[2].toString(),
    });

    console.log(userPayload);
    useParams(userPayload.id);

    const handleChange = (e) => {
        setusuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responser = await axios.get("/api/usuario/Lista");
            console.log(responser.data);
            setUserData(responser.data);
            const id = userPayload[3].toString();
            await axios.put(`/api/usuario/Editar/${id}`, usuario);
            window.location.href = `/login`;
        } catch (error) {
            console.log(usuario);

            console.error(error);
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
                            <form onSubmit={handleSubmit}>
                                <h2 className="titulo">Cambiar</h2>
                                <div className="inputBox">
                                    <input
                                        type="text"
                                        name="contrasena" // Agrega el atributo 'name' para identificar el campo
                                        value={usuario.contrasena}
                                        onChange={handleChange} // Asegúrate de que handleChange esté configurado correctamente
                                        required
                                    />
                                    <span>Contraseña</span>
                                    <i></i>
                                </div>
                                <input
                                    type="submit"
                                    style={{ float: "left", marginLeft: "0px" }}
                                    value="Validar"
                                />
                            </form>
                        </div>
                    </div>
                </center>
            </div>
            <Footer />
        </div>
    );
}