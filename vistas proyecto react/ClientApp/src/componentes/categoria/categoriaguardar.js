//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState, Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert


export class GuardarCategoria extends Component {

    constructor(props) {
        super(props)
        this.State = {
            NombreC: '',
            Estado: '',
            
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleEstadoChange = (e) => {
        this.setState({ Estado: e.target.value });
    }


    submitHandler = e => {
        e.preventDefault()
        // Verifica si algún campo está vacío
        if (!this.state.NombreC || !this.state.Estado) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vac&#237;os',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        console.log(this.state)
        axios.post('api/categoria/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "/categoria";
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <NavBar />
                <div className="modal-content">
                    <div className="contenidointeriorusuario">
                        <h2>Crear Categor&#237;a</h2>
                        <form className="row g-2" onSubmit={this.submitHandler}>

                            <div className="col-md-12">
                                <p>Categor&#237;a</p>
                        <input className="form-control" type="Text" name="NombreC"  onChange={this.changeHandler} ></input>
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
                                        value="Activo"
                                        checked={this.State.Estado === 'Activo'}
                                        onChange={this.handleEstadoChange}
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
                                        value="Inactivo"
                                        checked={this.State.Estado === 'Inactivo'}
                                        onChange={this.handleEstadoChange}
                                    />
                                    <label className="form-check-label" htmlFor="estadoInactivo">
                                        Inactivo
                                    </label>
                                </div>
                            </div>



                            <div className="d-flex align-items-center justify-content-center">
                                <button type="submit" class="btn btn-primary bajar1 mx-3">Guardar</button>
                            <Link to="/categoria" className="btn btn-primarycancelar bajar1 my-3  ">Cancelar</Link >
                           
                    </div>
                </form>
                    </div>
                </div>
            </div>
        )
    }
}

