//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export class GuardarUsuario extends Component {

    constructor(props) {
        super(props)
        this.State = {
            usuario1: '',
            rol: '',
            contrasena: '',
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/usuario/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "/usuario";
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div  >
                <NavBar />
                <div className="contenido1">
                    <div className="highlight contenidointeriorproducto">
                        <h2>Crear usuario</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                        <p>Digite el usuario1</p>
                        <input className="form-control" type="Text" name="usuario1" onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row">
                        <p>Digite La rol</p>
                        <input className="form-control" type="Text" name="rol" onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row">
                        <p>Digite el contrasena</p>
                        <input className="form-control" type="text" name="contrasena" onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" class="btn btn-primary bajar1">Guardar</button>
                </form>

                    </div>
                </div>
            </div>
        )
    }
}

