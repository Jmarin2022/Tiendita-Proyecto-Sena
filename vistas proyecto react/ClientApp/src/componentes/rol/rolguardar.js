//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
import { Link, useLocation } from 'react-router-dom';

export class GuardarRol extends Component {

    constructor(props) {
        super(props)
        this.State = {
            rol1: '',
            fecha: '',

        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/rol/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "/rol";
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div  >
                <NavBar />
                <div className="modal-content">
                    <div className="contenidointerior">
                        <h2>Crear Permiso</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row col-9  ">
                        <p>Rol</p>
                                <input className="form-control "  type="Text" name="rol1" onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row col-9">
                        <p>Fecha</p>
                                <input className="form-control " type="datetime-local" name="fecha" onChange={this.changeHandler} ></input>
                            </div>
                            <div className="btn-primary11">
                                <Link to="/rol" className="btn btn-primarycancelar bajar1 my-3 mx-3 ">Cancelar</Link >
                                <button type="submit" class="btn">Guardar</button>
                    </div>
                </form>  
                    </div>
                </div>
            </div>
        )
    }
}

