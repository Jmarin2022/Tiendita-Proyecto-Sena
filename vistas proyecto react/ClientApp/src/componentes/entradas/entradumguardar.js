//import "bootsrap/dist/css/bootstrap.min.css"
import {Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export class GuardarEntradas extends Component {

    constructor(props) {
        super(props)
        this.State = {
            IdProductos: '',
            cantidad: '',
            Proveedor: '',
            Fecha: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/entradum/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "/entradas";
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
                    <div className="highlight contenidointerior">
                        <h2>Crear Entrada</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                        <p>Digite el id del producto</p>
                       <input className="form-control" type="number" name="IdProductos"  onChange={this.changeHandler} ></input>
                    </div>
                   <div className="form-row">
                        <p>Digite la cantidad del producto</p>
                       <input className="form-control" type="number" name="cantidad"  onChange={this.changeHandler} ></input>
                    </div>
                   <div className="form-row">
                        <p>Digite el Proveedor</p>
                       <input className="form-control" type="Text" name="Proveedor"  onChange={this.changeHandler} ></input>
                    </div>
                   <div className="form-row">
                        <p>Ponga la fecha de la entrada</p>
                       <input className="form-control" type="datetime-local" name="Fecha"  onChange={this.changeHandler} ></input>
                    </div>
                            <button type="submit" class="btn btn-primary bajar1">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

