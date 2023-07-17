//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';

export class GuardarRolPermiso extends Component {

    constructor(props) {
        super(props)
        this.State = {
            IdRol: '',
            IdPermisos: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/rolespermiso/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "rolespermisos";
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
                        <p>Digite el id del rol</p><br />
                        <input type="numer" name="IdRol"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el id del permiso</p><br />
                        <input type="number" name="IdPermisos" onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
            </div>
        )
    }
}

