//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState, Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'


export class GuardarCategoria extends Component {

    constructor(props) {
        super(props)
        this.State = {
            NombreC: '',
            Estado: '',
            IdImagen: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    submitHandler = e => {
        e.preventDefault()
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
                <div className="contenido1">
                    <div className="highlight contenidointerior">
                        <h2>Crear Cliente</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                            <p>Digite el nombre de la categoria</p>
                        <input className="form-control" type="Text" name="NombreC"  onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row">
                                <p>Digite el estado de la categoria</p>
                        <input className="form-control" type="Text" name="Estado"  onChange={this.changeHandler} ></input>
                    </div>
                            <div className="form-row">
                                <p>Digite la imagen categoria</p>
                        <input className="form-control" type="Text" name="IdImagen"  onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                    </div>
                </div>
            </div>
        )
    }
}

