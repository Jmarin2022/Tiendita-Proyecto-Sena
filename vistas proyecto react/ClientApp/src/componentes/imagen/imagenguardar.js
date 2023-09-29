import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { Link, useLocation } from 'react-router-dom';

export const GuardarImagen = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const [formState, setFormState] = useState({
        Nombre: '',
        Descripcion: '',
        Stock: '',
        Precio: '',
        Categoria: '',
        StockMax: '',
        StockMin: '',
        
        Estado: '',
    });

    const [categorias, setCategorias] = useState([]); 

    const [clienteExistente, setClienteExistente] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const handleFormChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica si algún campo está vacío
        if (Object.values(formState).some(value => !value)) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vac&#237;os',
                text: 'Por favor, completa todos los campos.',
            });
            console.log(formState)
            return;
        }

        // Crear FormData para enviar imagen
        const formData = new FormData();
        formData.append('imageFile', selectedImage);
        for (const key in formState) {
            formData.append(key, formState[key]);
        }

        // Enviar los datos del formulario y la imagen al servidor
        axios.post('/api/imagen/Guardar', formData)
            .then(async response => {
                console.log(response);
                try {
                    console.log('Imagen subida al servidor.');

                    Swal.fire({
                        icon: 'success',
                        title: 'Producto Agregado',
                        text: 'El producto se ha agregado correctamente.',
                    });
                    window.location.href = "/imagen";
                } catch (error) {
                    console.error('Error al subir la imagen al servidor:', error);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const verificarCliente = () => {
        axios.get(`/api/imagen/Verificar/${formState.Nombre}`)
            .then(response => {
                setClienteExistente(response.data.message === "Ya existe un producto con el mismo nombre.");
                setMensaje(response.data.message);
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    setClienteExistente(true);
                    setMensaje(error.response.data.message);
                }
            });
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
        <div>
            <NavBar />

            <div className="modal-content">
                <div className="contenidointerior">
                    <h2>Agregar Producto</h2>

                    <form class="row g-2" onSubmit={handleSubmit}>
                        



                        <div class="col-md-6">
                            <div>
                                <label for="inputPassword4" class="form-label">Producto</label>
                                <input class={`form-control ${clienteExistente ? 'cliente-existe':''}`}
                                    type="text"
                                    name="Nombre"
                                    value={formState.Nombre}
                                    onChange={handleFormChange}
                                    onBlur={verificarCliente}
                                    required
                                />
                            </div>
                            <span className={`error-message ${clienteExistente ? '' : ''}`}>{mensaje}</span>
                        </div>



                        <div className="col-md-6">
                            <label for="inputPassword4" class="form-label">Descripci&#243;n</label>
                                <textarea className="form-control" name="Descripcion" onChange={handleFormChange} ></textarea>
                        </div>

                        <div className="col-md-6">
                                <label for="inputPassword4" class="form-label">Stock</label>
                                <input type="number" className="form-control" name="Stock" onChange={handleFormChange} />
                        </div>

                        <div className="col-md-6">
                            <label for="inputPassword4" class="form-label">Precio</label>
                            <input type="number" className="col-12 form-control" name="Precio" onChange={handleFormChange} />
                        </div>
                        
                      
                        <div className="col-md-6">
                            <label for="inputPassword4" class="form-label">Categoria</label>
                                
                                <select
                                className="form-select form-select-sm"
                                    name="Categoria" // Cambiar el nombre del campo a "Categoria"
                                    value={formState.Categoria} // Cambiar el valor del estado a "Categoria"
                                    onChange={handleFormChange}
                                >
                                    <option className="form-control" value="">Selec. Categoria</option>
                                    {categorias.map(categoria => (
                                        <option className="form-select" key={categoria.IdCategoria} value={categoria.IdCategoria}>
                                            {categoria.nombreC}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        <div className="col-md-6">
                                <label for="inputPassword4" class="form-label">Stock Maximo</label>
                                <input type="number" className="col-12 form-control" name="StockMax" onChange={handleFormChange} />
                        </div>

                        <div className="col-md-6">
                                <label for="inputPassword4" class="form-label">Stock Minimo</label>
                                <input type="number" className="col-12 form-control" name="StockMin" onChange={handleFormChange} />
                        </div>

                      
                        <div className="col-md-6">
                            <label>Estado</label>
                            <br />
                            <div className="form-check form-check-inline">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="estadoActivo"
                                    name="Estado"
                                    checked={formState.Estado === 'Activo'}
                                    onChange={() => setFormState({ ...formState, Estado: 'Activo' })}
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
                                    name="Estado"
                                    checked={formState.Estado === 'Inactivo'}
                                    onChange={() => setFormState({ ...formState, Estado: 'Inactivo' })}
                                />
                                <label className="form-check-label" htmlFor="estadoInactivo">
                                    Inactivo
                                </label>
                            </div>
                        </div>


                       


                        <div className="col-md-6">
                            
                            <label className="custom-file-upload">
                                <input type="file" className="form-control" onChange={handleImageChange} />
                                
                            </label>
                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} alt="Miniatura" className="thumbnail" />
                            )}
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                            
                            <button type="submit" className="btn btn-primary bajar1 my-3  mx-3">Guardar</button>
                            <Link to="/imagen" className="btn btn-primarycancelar bajar1 my-3 ">Cancelar</Link >    

                            



                        </div>

                    </form>
                   
                </div>
            
        </div>
        </div>


    );
};