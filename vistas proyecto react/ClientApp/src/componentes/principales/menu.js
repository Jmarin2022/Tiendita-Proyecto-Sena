import React from 'react';
import '../../assets/css/menu.css';
import '../../assets/css/landingPage.css'; // Asegúrate de tener los estilos CSS de la página de la "Landing Page" en este archivo


import { Link } from 'react-router-dom';





function Menu() {
    return (
    
        <header>
            <div className="container__menu">
                <div className="logo1">
                    <img className="imagen1" src={require('./img/Logo2.png')} alt="" />

                </div>
                <div className="menu">
                    <nav>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/vistacliente">Producto</Link></li>
                            <li><a href="#">Categoría</a></li>
                           
                            
                            <li><Link to="/login">
                                Ingresar
                            </Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Menu;