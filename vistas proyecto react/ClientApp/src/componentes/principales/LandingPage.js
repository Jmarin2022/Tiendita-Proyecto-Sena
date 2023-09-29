
//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import '../../assets/css/menu.css';
//import '../../assets/css/cards.css';
//import '../../assets/css/landingPage.css'; // Asegúrate de tener los estilos CSS de la página de la "Landing Page" en este archivo
//import hola from './img/LogoTiendita1.jpg';
//import hola1 from './img/Logo.png';
//import { Link } from 'react-router-dom';
//import { footer } from './footer';
//import Menu from './menu'

//import { Carousel } from 'react-responsive-carousel';
//import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Asegúrate de importar los estilos del carrusel
//import images from '../imagen/img/index'; // Importa el objeto de imágenes


////import { Carousel } from 'react-bootstrap';
////import productos from './productos'; // Importa el array de productos desde el archivo productos.js
///*const heroImagen = require.context('../imagen/img', true);*/

//export const LandingPage = () => {
//    const [imagen, setImagen] = useState([]);
//    const timer = 4000;
//    let i = 0;
//    const max = 12;

//    useEffect(() => {
//        obtenerImagen();

//    }, []);

//    const obtenerImagen = async () => {
//        try {
//            const response = await axios.get("/api/imagen/Lista");
//            setImagen(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    /*   const ejemploIdImagen = '1021.jpeg'; // Asigna el valor deseado aquí*/
//    const handleCardClick = (e) => {
//        const card = e.currentTarget;
//        card.classList.toggle('active');
//    };




//    return (
//        <div className="bodyp">
//            <Menu />


//            <div className="slider">
//                <div className="slide-track">
//                    {Object.keys(images).map((imageName, index) => (
//                        <div className="slide" key={index}>
//                            <img src={images[imageName]} alt={imageName} />
//                        </div>
//                    ))}
//                </div>
//            </div>



//            {/* Mostrar solo la lista de imágenes */}
//            <center>
//                <div className="tituloproductos">
//                    <h2 className="letra">Productos</h2>

//                </div>
//            </center>
//            <div className="cardpadre">
//                <div className="row">
//                    {imagen.map((producto) => (
//                        <div key={producto.idImagen} className="col-lg-3 col-md-4 col-sm-6 mb-3">
//                            <div className="cardContainer inactive">
//                                <div className="card2" onClick={handleCardClick}>
//                                    <div className="side front">
//                                        <div className="img">
//                                            <img
//                                                src={require(`../imagen/img/${producto.imagen1}`)}
//                                                className="img"
//                                                alt={producto.idImagen}
//                                            />
//                                        </div>
//                                        <div className="info">
//                                            <h2>{producto.nombre}</h2>
//                                            <p className="price">${producto.precio}</p>
//                                        </div>
//                                    </div>
//                                    <div className="side back">
//                                        <div className="info">
//                                            <h2>{producto.nombre}</h2>
//                                            <div className="reviews">
//                                                Agrega tus elementos SVG y contenido
//                                            </div>
//                                            <ul>
//                                                <li>{producto.descripcion}</li>
//                                            </ul>
//                                            {/*<div className="btn">*/}
//                                            {/*    <h4>Learn More</h4>*/}
//                                            {/*     Agrega tu SVG para el botón */}
//                                            {/*</div>*/}
//                                        </div>
//                                    </div>
//                                </div>
//                            </div>
//                        </div>
//                    ))}
//                </div>
//            </div>

//            < footer />
//        </div>

//    );
//};

//export default LandingPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/menu.css';
import '../../assets/css/cards.css';
import '../../assets/css/landingPage.css';
import hola from './img/Quepajoaqui.jpeg';
import hola1 from './img/Logo.png';
import { Link } from 'react-router-dom';
import { footer } from './footer';

/*import Menu from './menu';*/
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import images from '../imagen/img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';

export const LandingPage = () => {
    const [imagen, setImagen] = useState([]);
    const timer = 4000;
    let i = 0;
    const max = 12;

    useEffect(() => {
        obtenerImagen();
    }, []);

    const obtenerImagen = async () => {
        try {
            const response = await axios.get("/api/imagen/Lista");
            const productosAleatorios = shuffleArray(response.data); // Mezclar y obtener solo 5 productos
            setImagen(productosAleatorios);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = (e) => {
        const card = e.currentTarget;
        card.classList.toggle('active');
    };


    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray.slice(0, 5); // Obtener solo los primeros 5 elementos aleatorios
    }

    return (
        <div className="bodyp">

            <header>
               
                <div className="container__menu">
                    <div className="logo1">
                        <img className="imagen1" src={require('./img/Logo2.png')} alt="" />

                    </div>
                    {/*<div className="menu">*/}
                    {/*    <nav>*/}
                    {/*        <ul>*/}
                    {/*            <li><Link to="/" id="selected">Inicio</Link></li>*/}
                    {/*            <li><a href="#categorias">Categorías</a></li>*/}
                    {/*            <li><a href="#productos">Productos</a></li>*/}
                    {/*            <li><a href="#">Nosotros</a></li>*/}
                    {/*            <li><Link to="/login">*/}
                    {/*                Ingresar*/}
                    {/*            </Link></li>*/}
                    {/*        </ul>*/}
                    {/*    </nav>*/}
                    {/*</div>*/}
                    <div className="menu">
                        <nav>
                            <ul>
                                <li><Link to="/" className="menu-link" id="inicio">Inicio</Link></li>
                                <li><a href="#categorias" className="menu-link">Categorías</a></li>
                                <li><a href="#productos" className="menu-link">Productos</a></li>
                                {/*<li><Link to="./vistaCliente" className="menu-link">vista cliente </Link></li>*/}
                              
                                <li><Link to="/login" className="menu-link">Ingresar</Link></li>
                            </ul>
                        </nav>
                    </div>

                    </div>
                   
               
            </header>
            {/*<Menu />*/}
            <main>
                {/* Bloque de color que abarca todo el contenido hasta el botón "Ver Más" */}
                <div className="color-block">
                    <img src={hola} alt="Descripción de la imagen" className="imagen-bloque" />
                    <div className="container__cover">
                        <div className="cover mt-5 text-center">
                            <div className="text text-center">
                                <h1>Tu tiendita de confianza</h1>
                                <h2>Bienvenidos a Tiendita.soft</h2>
                                <a href="#categorias" className="ver-mas-button">
                                    Ver Más
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </main>
            <div id="categorias" className="color-block2">
                <div className="text-center my-2">
                    <h2 >Categorías</h2>
                </div>
                <div className="slider">
                    <div className="slide-track">
                        {Object.keys(images).map((imageName, index) => (
                            <div className="slide" key={index}>
                                <img src={images[imageName]} alt={imageName} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="productos" className="color-block3">
                <center>
                    <div className="tituloproductos">
                        <h2 className="letra">Productos</h2>
                    </div>
                </center>
                <div className="cardpadre">
                    <div className="row">
                        {imagen.map((producto) => (
                            <div key={producto.idImagen} className="col-md-3 mb-3">
                                <div className="cardContainer inactive">
                                    <div className="card2" onClick={handleCardClick}>
                                        <div className="side front">
                                            <div className="img">
                                                <img
                                                    src={require(`../imagen/img/${producto.imagen1}`)}
                                                    className="img"
                                                    alt={producto.idImagen}
                                                />
                                            </div>
                                            <div className="info">
                                                <h2>{producto.nombre}</h2>

                                                <td className="price">${numeral(producto.precio || 0).format('0,0.00')}</td>
                                                <p className="details">
                                                    <FontAwesomeIcon icon={faEye} className="eye-icon" />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="side back">
                                            <div className="info">
                                                <h2>{producto.nombre}</h2>
                                                <div className="reviews">

                                                </div>
                                                <ul>
                                                    <li>{producto.descripcion}</li>
                                                </ul>
                                                <ul>
                                                    <li>{producto.categoria}</li>
                                                </ul>

                                            </div>
                                            <div className="card-container">
                                                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default LandingPage;