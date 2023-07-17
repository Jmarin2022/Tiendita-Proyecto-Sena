//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';

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
                window.location.href = "/";
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
                        <p>Digite el usuario1</p><br />
                        <input type="Text" name="usuario1" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite La rol</p><br />
                        <input type="Text" name="rol" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el contrasena</p><br />
                        <input type="text" name="contrasena" onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
            </div>
        )
    }
}

