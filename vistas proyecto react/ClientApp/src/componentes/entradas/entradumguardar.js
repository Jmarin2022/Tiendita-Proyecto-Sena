//import "bootsrap/dist/css/bootstrap.min.css"
import {Component } from "react";
import axios from 'axios';

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
                window.location.href = "entradas";
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <p>Digite el id del producto</p>
                        <input type="number" name="IdProductos"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el id de la referencia</p>
                        <input type="number" name="cantidad"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el Proveedor</p>
                        <input type="Text" name="Proveedor"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Ponga la fecha de la entrada</p>
                        <input type="date" name="Fecha"  onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}

