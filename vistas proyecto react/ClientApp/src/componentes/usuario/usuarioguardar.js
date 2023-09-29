////import "bootsrap/dist/css/bootstrap.min.css"
//import { Component } from "react";
//import axios from 'axios';
//import { NavBar } from '../principales/navbar'
//import '../../assets/css/menu.css'

//export class GuardarUsuario extends Component {

//    constructor(props) {
//        super(props)
//        this.State = {
//            usuario1: '',
//            rol: '',
//            contrasena: '',
//        }
//    }

//    changeHandler = (e) => {
//        this.setState({ [e.target.name]: e.target.value })
//    }

//    submitHandler = e => {
//        e.preventDefault()
//        console.log(this.state)
//        axios.post('api/usuario/Guardar', this.state)
//            .then(response => {
//                console.log(response)
//                window.location.href = "/usuario";
//            })
//            .catch(error => {
//                console.log(error)
//            })
//    }
//    render() {
//        return (
//            <div  >
//                <NavBar />
//                <div className="contenido1">
//                    <div className="highlight contenidointeriorproducto">
//                        <h2>Crear usuario</h2>
//                        <form onSubmit={this.submitHandler}>
//                            <div className="form-row">
//                                <p>Digite el usuario1</p>
//                                <input className="form-control" type="Text" name="usuario1" onChange={this.changeHandler} ></input>
//                            </div>
//                            <div className="form-row">
//                                <p>Digite La rol</p>
//                                <input className="form-control" type="Text" name="rol" onChange={this.changeHandler} ></input>
//                            </div>
//                            <div className="form-row">
//                                <p>Digite el contrasena</p>
//                                <input className="form-control" type="text" name="contrasena" onChange={this.changeHandler} ></input>
//                            </div>
//                            <button type="submit" class="btn btn-primary bajar1">Guardar</button>
//                        </form>

//                    </div>
//                </div>
//            </div>
//        )
//    }
//}

import { useState, useEffect } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert

const GuardarUsuario = () => {
    const [usuario1, setUsuario1] = useState('');
    const [documento, setDocumnto] = useState('');

    const [rol, setRol] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [roles, setRoles] = useState([]);
    const [estado, setEstado] = useState(''); // Cambiado a string

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'usuario1') {
            setUsuario1(value);
        } else if (name === 'rol') {
            setRol(value);
        } else if (name === 'contrasena') {
            setContrasena(value);
        } else if (name === 'documento') {
            setDocumnto(value);
        }
        else if (name === 'estado') {
            setEstado(value);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // Verifica si algún campo está vacío
        if (!usuario1 || !rol || !contrasena || !documento || !estado) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vac&#237;os',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        const userData = { documento, usuario1, rol, contrasena, estado };
        console.log(userData);
        axios.post('api/usuario/Guardar', userData)
            .then(response => {
                console.log(response);
                window.location.href = "/usuario";
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        // Obtener la lista de roles desde la API cuando el componente se monta
        axios.get('/api/rol/Lista')
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <NavBar />

            <div className="modal-content">
                <div className="contenidointeriorusuario">
                    <h2>Crear usuario</h2>
                    <form className="row g-2" onSubmit={submitHandler}>
                        
                        <div className="col-md-12">
                           
                            
                            <select name="rol" value={rol} onChange={changeHandler} className="form-select form-select-sm" >
                                <option value="">Seleccione un rol</option>
                                {roles.map(role => (
                                    <option key={role.idRol} value={role.idRol}>
                                        {role.rol1}
                                    </option>
                                ))}
                            </select>
                        
                       
                        </div>

                        <div className="form-row col-12">
                            <label for="inputPassword4" class="form-label">Documento</label>

                            <input className="form-control" type="number" name="documento" value={documento} onChange={changeHandler} />
                        </div>

                        <div className="form-row col-12">
                            <label for="inputPassword4" class="form-label">Usuario</label>
                            
                            <input className="form-control" type="text" name="usuario1" value={usuario1} onChange={changeHandler} />
                        </div>
                        <div className="form-row col-12">
                            <p>Contrasena</p>
                            <input className="form-control" type="text" name="contrasena" value={contrasena} onChange={changeHandler} />
                        </div>

                        <div className="col-md-6">
                            <label>Estado</label>
                            <br />
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="estadoActivo"
                                    name="estado"
                                    value="Activo"
                                    checked={estado === 'Activo'}
                                    onChange={changeHandler}
                                />
                                <label className="form-check-label" htmlFor="estadoActivo">
                                    Activo
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="estadoInactivo"
                                    name="estado"
                                    value="Inactivo"
                                    checked={estado === 'Inactivo'}
                                    onChange={changeHandler}
                                />
                                <label className="form-check-label" htmlFor="estadoInactivo">
                                    Inactivo
                                </label>
                            </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-center">
                            
                            <button type="submit" className="btn btn-primary bajar1  mx-3">Guardar</button>
                            <Link to="/usuario" className="btn btn-primarycancelar bajar1 my-3 ">Cancelar</Link >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GuardarUsuario;
