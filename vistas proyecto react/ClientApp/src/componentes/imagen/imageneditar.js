//import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'

//export const ImagenEditar = () => {
//    const { idImagen } = useParams();
//    const [selectedImage, setSelectedImage] = useState(null);
//    const [imagen, setimagen] = useState({
//        nombre:'',
//        descripcion: '',
//        stock :'',
//        precio: '',
//        categoria: '',
//        stockMax: '',
//        stockMin: '',
//        imagen1: '',
//    });

//    useEffect(() => {
//        cargarimagen();
//    }, []);

//    const cargarimagen = async () => {
//        try {
//            const response = await axios.get(`/api/imagen/${idImagen}`);
//            setimagen(response.data);
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleChange = (e) => {
//        setimagen({
//            ...imagen,
//            [e.target.name]: e.target.value,
//        });
//    };

//    const handleSubmit = async (e) => {
//        e.preventDefault();

//        // Crear FormData para enviar la nueva imagen
//        const formData = new FormData();
//        formData.append('ImagenFile', selectedImage); // Cambia el nombre del campo a 'ImagenFile'
//        for (const key in imagen) {
//            formData.append(key, imagen[key]);
//        }

//        try {
//            // Enviar los datos actualizados, incluyendo la nueva imagen
//            await axios.put(`/api/imagen/Editar/${idImagen}`, formData, {
//                headers: {
//                    'Content-Type': 'multipart/form-data', // Asegura que el servidor procese correctamente la imagen
//                },
//            });
//            window.location.href = `/imagen`;
//        } catch (error) {
//            console.error(error);
//        }
//    };

//    const handleImageChange = (e) => {
//        setSelectedImage(e.target.files[0]);
//    };


//    return (

//        <div  >
//            <NavBar />
//            <div className="contenido1">
//                <div className="highlight contenidointerior">
//                    <h2>Editar Cliente</h2>
//                    <form onSubmit={handleSubmit}>
//                        <div className="form-row">

//                            <div className="col">
//                    <label htmlFor="nombre">nombre:</label>
//                    <input type="text" className="form-control" id="nombre" name="nombre" value={imagen.nombre} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="descripcion">descripcion:</label>
//                    <input type="text" className="form-control" id="descripcion" name="descripcion" value={imagen.descripcion} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="stock">stock:</label>
//                    <input type="text" className="form-control" id="stock" name="stock" value={imagen.stock} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="precio">precio:</label>
//                    <input type="text" className="form-control" id="precio" name="precio" value={imagen.precio} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="categoria">categoria:</label>
//                    <input type="text" className="form-control" id="categoria" name="categoria" value={imagen.categoria} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="stockMax">stockMax:</label>
//                    <input type="text" className="form-control" id="stockMax" name="stockMax" value={imagen.stockMax} onChange={handleChange} />
//                </div>
//                 <div className="col">
//                    <label htmlFor="stockMin">stockMin:</label>
//                    <input type="text" className="form-control" id="stockMin" name="stockMin" value={imagen.stockMin} onChange={handleChange} />
//                </div>

//                            <div className="col-md-6">
//                                <label className="custom-file-upload">
//                                    <input
//                                        type="file"
//                                        className="form-control"
//                                        accept="image/*" // Esto permite solo archivos de imagen
//                                        onChange={(e) => handleImageChange(e)}
//                                    />
//                                    Seleccionar Nueva Imagen
//                                </label>
//                                {selectedImage && (
//                                    <img
//                                        src={URL.createObjectURL(selectedImage)}
//                                        alt="Miniatura"
//                                        className="thumbnail"
//                                    />
//                                )}
//                            </div>



//                            <button type="submit">Guardar</button>
//                        </div>
//            </form>
//                </div>
//            </div>
//        </div>
//    );
//};



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ImagenEditar = () => {
    const { idImagen } = useParams();

    const handleFormChange = (e) => {
        setimagen({ ...imagen, [e.target.name]: e.target.value });
    };

    const [categorias, setCategorias] = useState([]); 
    const [imagen, setimagen] = useState({
        nombre: '',
        descripcion: '',
        stock: '',
        precio: '',
        categoria: '',
        stockMax: '',
        stockMin: '',
        imagen1: '',
        estado: '',
    });

    useEffect(() => {
        cargarimagen();
    }, []);

    const cargarimagen = async () => {
        try {
            const response = await axios.get(`/api/imagen/${idImagen}`);
            setimagen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setimagen({
            ...imagen,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*Verifica si algún campo está vacío*/
        if (Object.values(imagen).some(value => !value)) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        try {
            await axios.put(`/api/imagen/Editar/${idImagen}`, imagen);
            window.location.href = `/imagen`;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Obtener la lista de roles desde la API cuando el componente se monta
        axios.get('/api/categoria/Lista')
            .then(response => {
                setCategorias(response.data); // Guardar la lista de categorías en el estado
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (

        <div  >
            <NavBar />
            <div className="modal-content">
                <div className="contenidointerior">
                    <h2>Editar Producto</h2>
                    <form class="row g-2" onSubmit={handleSubmit}>
                        

                            <div class="col-md-6">
                                <label htmlFor="nombre" class="form-label">Nombre</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={imagen.nombre} onChange={handleChange} />
                            </div>
                            <div class="col-md-6">
                            <label htmlFor="descripcion" class="form-label">Descripci&#243;n</label>
                            <textarea className="form-control" id="descripcion" name="descripcion" value={imagen.descripcion} onChange={handleChange} ></textarea>
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="stock" class="form-label">Stock</label>
                                <input type="text" className="form-control" id="stock" name="stock" value={imagen.stock} onChange={handleChange} />
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="precio" class="form-label">Precio</label>
                                <input type="text" className="form-control" id="precio" name="precio" value={imagen.precio} onChange={handleChange} />
                            </div>
                            <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Categor&#237;a</label>

                                <select
                                    className="col-12 "
                                    name="Categoria" // Cambiar el nombre del campo a "Categoria"
                                    value={imagen.Categoria} // Cambiar el valor del estado a "Categoria"
                                    onChange={handleFormChange}
                                >
                                    <option value="">Selec. Categoria</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria.IdCategoria} value={categoria.IdCategoria}>
                                            {categoria.nombreC}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="stockMax" class="form-label">StockMax:</label>
                                <input type="text" className="form-control" id="stockMax" name="stockMax" value={imagen.stockMax} onChange={handleChange} />
                            </div>
                            <div class="col-md-6">
                                <label htmlFor="stockMin" class="form-label">StockMin:</label>
                                <input type="text" className="form-control" id="stockMin" name="stockMin" value={imagen.stockMin} onChange={handleChange} />
                            </div>
                            {/*<div className="col">*/}
                            {/*    <label htmlFor="imagen1">imagen1:</label>*/}
                            {/*    <input type="text" className="form-control" id="imagen1" name="imagen1" value={imagen.imagen1} onChange={handleChange} />*/}
                            {/*</div>*/}

                        <div class="col-md-6">
                            <label>Estado</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="estadoActivo"
                                    name="estadoActivo"
                                    checked={imagen.estado === 'Activo'}
                                    onChange={() => setimagen({ ...imagen, estado: 'Activo' })}
                                />
                                <label className="form-check-label" htmlFor="estadoActivo">
                                    Activo
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="estadoInactivo"
                                    name="estadoInactivo"
                                    checked={imagen.estado === 'Inactivo'}
                                    onChange={() => setimagen({ ...imagen, estado: 'Inactivo' })}
                                />
                                <label className="form-check-label" htmlFor="estadoInactivo">
                                    Inactivo
                                </label>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-primary bajar1 my-3 mx-3">Guardar Cambios</button>
                        <Link to="/imagen" className="btn btn-primarycancelar bajar1 my-3 ">Cancelar</Link >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


