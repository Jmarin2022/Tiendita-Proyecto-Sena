//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';

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
                        <p>Digite el rol1</p><br />
                        <input type="Text" name="rol1" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite La fecha</p><br />
                        <input type="datetime-local" name="fecha" onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
            </div>
        )
    }
}

