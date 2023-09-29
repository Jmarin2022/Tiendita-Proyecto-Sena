import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const CategoriaEditar = () => {
    const { idCategoria } = useParams();

    const [categoria, setCategoria] = useState({
        nombreC: '',
        estado: '',
        
    });

    useEffect(() => {
        cargarCategoria();
    }, []);

    const cargarCategoria = async () => {
        try {
            const response = await axios.get(`/api/categoria/${idCategoria}`);
            setCategoria(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*Verifica si algún campo está vacío*/
        //if (Object.values(categoria).some(value => !value)) {
        //    Swal.fire({
        //        icon: 'error',
        //        title: 'Campos vacíos',
        //        text: 'Por favor, completa todos los campos.',
        //    });
        //    return;
        //}

        try {
            await axios.put(`/api/categoria/Editar/${idCategoria}`, categoria);
            window.location.href = `/categoria`;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div >
            <NavBar />
            <div className="modal-content">
                <div className="contenidointeriorusuario">
                    <h2>Editar Categoría</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                    <label htmlFor="nombreC">Nombre:</label>
                                <input type="text" className="form-control" id="nombreC" name="nombreC" value={categoria.nombreC} onChange={handleChange} />
                </div>

                            <div class="col-md-6">
                                <label>Estado</label>
                                <br />
                                <div className="form-check form-check-inline">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="estadoActivo"
                                        name="estadoActivo"
                                        checked={categoria.estado === 'Activo'}
                                        onChange={() => setCategoria({ ...categoria, estado: 'Activo' })}
                                    />
                                    <label className="form-check-label" htmlFor="estadoActivo">
                                        Activo
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="estadoInactivo"
                                        name="estadoInactivo"
                                        checked={categoria.estado === 'Inactivo'}
                                        onChange={() => setCategoria({ ...categoria, estado: 'Inactivo' })}
                                    />
                                    <label className="form-check-label" htmlFor="estadoInactivo">
                                        Inactivo
                                    </label>
                                </div>
                            </div>


                           
                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-primary bajar1 my-3 mx-3">Guardar Cambios</button>
                                <Link to="/categoria" className="btn btn-primarycancelar bajar1 my-3 ">Cancelar</Link >
                            </div>
                        </div>
            </form>
                </div>
            </div>
        </div>
    );
};

export default CategoriaEditar;
