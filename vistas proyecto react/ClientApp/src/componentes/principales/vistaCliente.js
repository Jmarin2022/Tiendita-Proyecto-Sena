//import React, { useEffect, useState } from 'react';
//import axios from 'axios';
//import '../../assets/css/menu.css';
//import '../../assets/css/cards.css';
//import '../../assets/css/landingPage.css';
//import { Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye } from '@fortawesome/free-solid-svg-icons';
//import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//import { FaSignOutAlt } from 'react-icons/fa';
//import { useUserContext } from '../principales/UserContext'
//import numeral from 'numeral';
//import { FiLogOut } from "react-icons/fi";

//export const CistaCliente = () => {
//    const [imagen, setImagen] = useState([]);
//    const [searchCategory, setSearchCategory] = useState("");
//    const [searchName, setSearchName] = useState("");
//    const { userPayload } = useUserContext();


//    if (userPayload == null) {
//        window.location.href = "/login";
//    }

//    useEffect(() => {
//        obtenerImagen();
//    }, [searchCategory, searchName]);

//    const obtenerImagen = async () => {
//        try {
//            const response = await axios.get("/api/imagen/Lista");
//            setImagen(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleCardClick = (e) => {
//        const card = e.currentTarget;
//        card.classList.toggle('active');
//    };

//    const uniqueCategories = [...new Set(imagen.map(producto => producto.categoria))];

//    const handleCategoryChange = (category) => {
//        setSearchCategory(category);
//    };
//    const handleLogout = () => {
//        localStorage.removeItem('userPayload');

//        window.location.href = "/login";
//    };

//    return (
//        <div className="bodyp">
//            <header>
//                <div className="container__menu">
//                    <div className="logo1">
//                        <img className="imagen1" src={require('./img/Logo2.png')} alt="" />
//                    </div>
//                    <div className="menu">
//                        <nav>
//                            <ul>
//                                <li><Link to="/"></Link><button className="botondecerrar" onClick={handleLogout}>
//                                    <FiLogOut className="cerrar-sesion-icon" />
//                                </button></li>

//                            </ul>
//                        </nav>
//                    </div>
//                </div>
//            </header>
//            <div id="productos4" className="color-block3">
//                <center>
//                    <div className="tituloproductos">
//                        <h2 className="letra">Productos</h2>
//                    </div>
//                </center>
//                <div className="cardpadre">
//                    <div className="search-filters">
//                        <div className="category-search">
//                            <label htmlFor="categorySelect" className="category-label">
//                                Selecciona la categoría:
//                            </label>
//                            <select
//                                id="categorySelect"
//                                className="category-select"
//                                value={searchCategory}
//                                onChange={(e) => handleCategoryChange(e.target.value)}
//                            >
//                                <option value="">Todas las categorías</option>
//                                {uniqueCategories.map(category => (
//                                    <option key={category} value={category}>{category}</option>
//                                ))}
//                            </select>
//                        </div>
//                        <div className="name-search">
//                            <label htmlFor="nameInput" className="name-label">
//                                Buscar por nombre:
//                            </label>
//                            <input
//                                type="text"
//                                id="nameInput"
//                                placeholder="        Nombre del producto"
//                                value={searchName}
//                                onChange={(e) => setSearchName(e.target.value)}
//                            />
//                        </div>
//                    </div>
//                    <div className="row">
//                        {imagen.map((producto) => {
//                            if ((!searchCategory || producto.categoria === searchCategory) &&
//                                (!searchName || producto.nombre.toLowerCase().includes(searchName.toLowerCase()))) {
//                                return (
//                                    <div key={producto.idImagen} className="col-md-3 mb-3">
//                                        <div className="cardContainer inactive">
//                                            <div className="card2" onClick={handleCardClick}>
//                                                <div className="side front">
//                                                    <div className="img">
//                                                        <img
//                                                            src={require(`../imagen/img/${producto.imagen1}`)}
//                                                            className="img"
//                                                            alt={producto.idImagen}
//                                                        />
//                                                    </div>
//                                                    <div className="info">
//                                                        <h2>{producto.nombre}</h2>
//                                                        <td className="price">${numeral(producto.precio || 0).format('0,0.00')}</td>
//                                                        <p className="details">
//                                                            <FontAwesomeIcon icon={faEye} className="eye-icon" />
//                                                        </p>
//                                                    </div>
//                                                </div>
//                                                <div className="side back">
//                                                    <div className="info">
//                                                        <h2>{producto.nombre}</h2>
//                                                        <div className="reviews"></div>
//                                                        <ul>
//                                                            <li>{producto.descripcion}</li>
//                                                        </ul>
//                                                        <ul>
//                                                            <li>{producto.categoria}</li>
//                                                        </ul>
//                                                    </div>
//                                                    <div className="card-container">
//                                                        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
//                                                    </div>
//                                                </div>
//                                            </div>
//                                        </div>
//                                    </div>
//                                );
//                            }
//                            return null;
//                        })}
//                    </div>
//                </div>
//            </div>
//            <footer>
//                {/* ... Tu código para el pie de página */}
//            </footer>
//        </div>
//    );
//};

//export default CistaCliente;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/menu.css';
import '../../assets/css/cards.css';
import '../../assets/css/landingPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FaSignOutAlt } from 'react-icons/fa';
import numeral from 'numeral';
import { FiLogOut } from "react-icons/fi";

export const CistaCliente = () => {
    const [imagen, setImagen] = useState([]);
    const [searchCategory, setSearchCategory] = useState("");
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        obtenerImagen();
    }, [searchCategory, searchName]);

    const obtenerImagen = async () => {
        try {
            const response = await axios.get("/api/imagen/Lista");
            setImagen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCardClick = (e) => {
        const card = e.currentTarget;
        card.classList.toggle('active');
    };

    const uniqueCategories = [...new Set(imagen.map(producto => producto.categoria))];

    const handleCategoryChange = (category) => {
        setSearchCategory(category);
    };
    const handleLogout = () => {
        // Elimina el userPayload del contexto


        // Borra el valor almacenado en el localStorage
        localStorage.removeItem('userPayload');

        // Redirige a la página de inicio de sesión
        window.location.href = "/login";
    };
    return (
        <div className="bodyp">
            <header>
                <div className="container__menu">
                    <div className="logo1">
                        <img className="imagen1" src={require('./img/Logo2.png')} alt="" />
                    </div>
                    <div className="menu">
                        <nav>
                            <ul>
                                <li><Link to="/"></Link><button className="botondecerrar" onClick={handleLogout}>
                                    <FiLogOut className="cerrar-sesion-icon" />
                                </button></li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <div id="productos4" className="color-block3">
                <center>
                    <div className="tituloproductos">
                        <h2 className="letra">Productos</h2>
                    </div>
                </center>
                <div className="cardpadre">
                    <div className="search-filters">
                        <div className="category-search">
                            <label htmlFor="categorySelect" className="category-label">
                                Selecciona la categoría:
                            </label>
                            <select
                                id="categorySelect"
                                className="category-select"
                                value={searchCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {uniqueCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="name-search">
                            <label htmlFor="nameInput" className="name-label">
                                Buscar por nombre:
                            </label>
                            <input
                                type="text"
                                id="nameInput"
                                placeholder="        Nombre del producto"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {imagen.map((producto) => {
                            if ((!searchCategory || producto.categoria === searchCategory) &&
                                (!searchName || producto.nombre.toLowerCase().includes(searchName.toLowerCase()))) {
                                const stockEstado = producto.stock < 1 ? 'Agotado' : 'Disponible';
                                return (
                                    <div key={producto.idImagen} className="col-md-3 mb-3">
                                        {/*<div className={`cardContainer inactive ${stockEstado.toLowerCase()}`}>*/}
                                        <div className="cardContainer inactive">
                                            <div className={`card3 inactive ${stockEstado.toLowerCase()}`} onClick={handleCardClick}>


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
                                                     
                                                        <p className="price">${numeral(producto.precio || 0).format('0,0.00')}</p>

                                                        <p className={`stock-state ${stockEstado.toLowerCase()}`}>{stockEstado}</p>
                                                        <p className="details">
                                                            <FontAwesomeIcon icon={faEye} className="eye-icon" />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="side back">
                                                    <div className="info">
                                                        <h2>{producto.nombre}</h2>
                                                        <div className="reviews"></div>
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
                                        {/*</div>hh*/}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                </div>
            </div>
            <footer>
                {/* ... Tu código para el pie de página */}
            </footer>
        </div>
    );
};

export default CistaCliente;
