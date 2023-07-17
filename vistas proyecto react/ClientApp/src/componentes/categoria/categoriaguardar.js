//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState, Component } from "react";
import axios from 'axios';

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
                window.location.href = "categoria";
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
                        <input type="Text" name="NombreC"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <input type="Text" name="Estado"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <input type="Text" name="IdImagen"  onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}

