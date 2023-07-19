//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

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
                <div className="contenido1">
                    <div className="highlight contenidointerior1">
                        <h2>Crear Permiso</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                        <p>Digite el rol1</p>
                                <input className="form-control"  type="Text" name="rol1" onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row">
                        <p>Digite La fecha</p>
                                <input className="form-control" type="datetime-local" name="fecha" onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
                    </div>
                </div>
            </div>
        )
    }
}

