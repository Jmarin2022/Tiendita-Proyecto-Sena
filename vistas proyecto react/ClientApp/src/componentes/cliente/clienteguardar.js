//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState, Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

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

            <div className="container1">
                <NavBar />
                <div className="contenido">
                    <div className="highlight contenidointeriorproducto">
                        <h2>Crear Cliente</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="Mitad1">
                                <div className="form-row">
                                    <p>Digite el nombre del cliente</p>
                                    <input className="form-control" type="Text" name="nombre" onChange={this.changeHandler}></input>
                                </div>
                                <div className="form-row">
                                    <p>Digite el apellido del cliente</p>
                                    <input className="form-control" type="Text" name="apellido" onChange={this.changeHandler}></input>
                                </div>
                                <div className="form-row">
                                    <p>Digite el numero de celular</p>
                                    <input className="form-control" type="number" name="celular" onChange={this.changeHandler}></input>
                                </div>
                            </div>
                            <div className="Mitad2">
                                <div className="form-row">
                                    <p>Digite su direccion</p>
                                    <input className="form-control" type="Text" name="direccion" onChange={this.changeHandler}></input>
                                </div>
                                <div className="form-row">
                                    <p>Digite la fecha de registro</p>
                                    <input className="form-control" type="date" name="fechaRegistro" onChange={this.changeHandler}></input>
                                </div>
                                <div className="form-row">
                                    <p>Digite el estado</p>
                                    <input className="form-control" type="Text" name="estado" onChange={this.changeHandler}></input>
                                </div>
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
            </div>
</div >

        )
    }
}

