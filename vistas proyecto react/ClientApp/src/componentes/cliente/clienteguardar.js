
//import React, { useState } from "react";
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import Footer from '../principales/footer';
//import '../../assets/css/menu.css';

//export const GuardarCliente = () => {
//    const [cliente, setCliente] = useState({
//        nombre: '',
//        apellido: '',
//        celular: '',
//        direccion: '',
//        fechaRegistro: '',
//        estado: '',
//        documento: '' // Asegúrate de incluir esto en tu estado
//    });

//    const [mensaje, setMensaje] = useState('');
//    const [clienteExistente, setClienteExistente] = useState(false);

//    const changeHandler = (e) => {
//        setCliente({ ...cliente, [e.target.name]: e.target.value });
//    }

//    const submitHandler = e => {
//        e.preventDefault();
//        if (clienteExistente) {
//            // Manejar el caso de cliente existente
//            // ...
//        } else {
//            // Manejar el caso de cliente nuevo
//            console.log(cliente);
//            axios.post('api/cliente/Guardar', cliente)
//                .then(response => {
//                    console.log(response);
//                    window.location.href = "/cliente";
//                })
//                .catch(error => {
//                    console.log(error);
//                });
//        }
//    }

//    const verificarCliente = () => {
//        if (cliente.documento) {
//            axios.get(`/api/cliente/Verificar/${cliente.documento}`)
//                .then(response => {
//                    setClienteExistente(response.data.message === "El cliente ya existe.");
//                    setMensaje(response.data.message);
//                })
//                .catch(error => {
//                    console.log(error);
//                    if (error.response && error.response.status === 400) {
//                        setClienteExistente(true);
//                        setMensaje(error.response.data.message);
//                    }
//                });
//        }
//    }

//    return (
//        <div>
//            <NavBar />
//            <div className="modal-content">
//                <div className="contenidointerior">
//                    <h2>Crear Cliente</h2>
//                    <form class="row g-3" onSubmit={submitHandler} >
//                        <div class="col-md-6">
//                        <div class={`{clienteExistente ? 'cliente-existe' : 'cliente-no-existe'}`}>
//                            <label for="inputPassword4" class="form-label">Docuemnto</label>
//                            <input class={`form-control ${clienteExistente ? 'cliente-existe' : 'cliente-no-existe'}`}
//                                type="number"
//                                name="documento"
//                                value={cliente.documento}
//                                onChange={changeHandler}
//                                onBlur={verificarCliente}
//                                required
//                            />
//                        </div>
//                        <span className={`error-message ${clienteExistente ? '' : ''}`}>{mensaje}</span>
//                        </div>


//                        <div class="col-md-6">
//                            <label for="inputCity" class="form-label">Dirección</label>
//                            <input type="Text" class="form-control" name="direccion" onChange={changeHandler} />
//                        </div>



//                        <div class="col-md-6">
//                            <label for="validationCustom01" class="form-label">Nombre</label>
//                            <input type="Text" class="form-control" name="nombre" value="Mark" id="validationCustom01" onChange={changeHandler} />
//                        </div>
//                        <div class="valid-feedback">
//                            Looks good!
//                        </div>

//                        <div class="col-6">
//                            <label for="inputAddress2" class="form-label">Celular 2</label>
//                            <input type="number" class="form-control" name="celular" placeholder="Apartment, studio, or floor" onChange={changeHandler} />
//                        </div>


//                        <div class="col-6">
//                            <label for="inputAddress" class="form-label">Apellido</label>
//                            <input type="Text" class="form-control" name="apellido" onChange={changeHandler} placeholder="1234 Main St" />
//                        </div>


//                        <div class="col-md-4">
//                            <label for="inputCity" class="form-label">Fecha de registro</label>
//                            <input type="datetime-local" class="form-control" name="fechaRegistro" onChange={changeHandler} />
//                        </div>
//                        <div class="col-md-2">
//                            <label for="inputZip" class="form-label">Estado</label>
//                            <input type="text" class="form-control" name="estado" onChange={changeHandler} />
//                        </div>

//                        <div className="d-flex align-items-center justify-content-center">
//                            <button type="submit" class="btn btn-primary">Guardar</button>
//                        </div>
//                    </form>


//                </div>

//            </div>



//            <Footer />
//        </div>
//    );
//};




import React, { useState } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import Footer from '../principales/footer';
import '../../assets/css/menu.css';
import Swal from 'sweetalert2'; // Importa SweetAlert

export const GuardarCliente = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        direccion: '',
        fechaRegistro: '',
        estado: '',
        documento: '' // Asegúrate de incluir esto en tu estado
    });

    const [mensaje, setMensaje] = useState('');
    const [clienteExistente, setClienteExistente] = useState(false);

    const changeHandler = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();

        // Verifica si algún campo está vacío
        if (Object.values(cliente).some(value => !value)) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }


        if (clienteExistente) {
            // Manejar el caso de cliente existente
            // ...
        } else {
            // Manejar el caso de cliente nuevo
            console.log(cliente);
            axios.post('api/cliente/Guardar', cliente)
                .then(response => {
                    console.log(response);
                    window.location.href = "/cliente";
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const verificarCliente = () => {
        if (cliente.documento) {
            axios.get(`/api/cliente/Verificar/${cliente.documento}`)
                .then(response => {
                    setClienteExistente(response.data.message === "El cliente ya existe.");
                    setMensaje(response.data.message);
                })
                .catch(error => {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        setClienteExistente(true);
                        setMensaje(error.response.data.message);
                    }
                });
        }
    }

    return (
        <div>
            <NavBar />
            <div className="modal-content">
                <div className="contenidointerior">
                    <h2>Crear Cliente</h2>
                    <form class="row g-3" onSubmit={submitHandler} >

                        <div class="col-md-6">
                        <div class={`{clienteExistente ? 'cliente-existe' : 'cliente-no-existe'}`}>
                            <label for="inputPassword4" class="form-label">Docuemnto</label>
                            <input class={`form-control ${clienteExistente ? 'cliente-existe' : 'cliente-no-existe'}`}
                                type="number"
                                name="documento"
                                value={cliente.documento}
                                onChange={changeHandler}
                                onBlur={verificarCliente}
                                required
                            />
                        </div>
                        <span className={`error-message ${clienteExistente ? '' : ''}`}>{mensaje}</span>
                        </div>


                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">Dirección</label>
                            <input type="Text" class="form-control" name="direccion" onChange={changeHandler} />
                        </div>
                        


                        <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">Nombre</label>
                            <input type="Text" class="form-control" name="nombre"  onChange={changeHandler} />
                        </div>
                        

                        <div class="col-6">
                            <label for="inputAddress2" class="form-label">Celular 2</label>
                            <input type="number" class="form-control" name="celular" placeholder="Apartment, studio, or floor" onChange={changeHandler} />
                        </div>


                        <div class="col-6">
                            <label for="inputAddress" class="form-label">Apellido</label>
                            <input type="Text" class="form-control" name="apellido" onChange={changeHandler} placeholder="1234 Main St" />
                        </div>
                        
                        
                        <div class="col-md-4">
                            <label for="inputCity" class="form-label">Fecha de registro</label>
                            <input type="datetime-local" class="form-control" name="fechaRegistro" onChange={changeHandler} />
                        </div>
                        <div class="col-md-2">
                            <label for="inputZip" class="form-label">Estado</label>
                            <input type="text" class="form-control" name="estado" onChange={changeHandler} />
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>


                </div>

            </div>



            <Footer />
        </div>
    );
};