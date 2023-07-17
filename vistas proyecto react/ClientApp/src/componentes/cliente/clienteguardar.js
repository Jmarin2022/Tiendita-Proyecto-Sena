//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState, Component } from "react";
import axios from 'axios';

export class GuardarCliente extends Component {

    constructor(props) {
        super(props)
        this.State = {
            nombre: '',
            apellido: '',
            celular: '',
            direccion: '',
            fechaRegistro: '',
            estado: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/cliente/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "cliente";
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
                        <p>Digite el nombre del cliente</p>
                        <input type="Text" name="nombre"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el apellido del cliente</p>
                        <input type="Text" name="apellido"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el numero de celular</p>
                        <input type="number" name="celular"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite su direccion</p>
                        <input type="Text" name="direccion"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite la fecha de registro</p>
                        <input type="date" name="fechaRegistro"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el estado</p>
                        <input type="Text" name="estado"  onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}

