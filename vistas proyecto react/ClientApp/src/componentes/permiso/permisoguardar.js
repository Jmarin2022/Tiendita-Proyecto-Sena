//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export class GuardarPermiso extends Component {

    constructor(props) {
        super(props)
        this.State = {
            Modulo: '',
            Crear: '',
            Eliminar: '',
            Editar: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/permiso/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "permiso";
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
                    <div className="highlight contenidointerior1">
                        <h2>Crear Permiso</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-row">
                        <p>Digite el Modulo</p><br />
                                <input className="form-control" type="Text" name="Modulo"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite si puede crear</p><br />
                                <select className="custom-select"  name="Crear" onChange={this.changeHandler}>
                            <option  value="">Seleccione</option>
                            <option  value="Si">Si</option>
                            <option  value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <p>Digite si puede Eliminar</p><br />
                                <select className="custom-select" name="Eliminar" onChange={this.changeHandler}>
                            <option  value="">Seleccione</option>
                            <option  value="Si">Si</option>
                            <option  value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <p>Digite si puede Editar</p><br />
                                <select className="custom-select" name="Editar" onChange={this.changeHandler} >
                            <option  value="">Seleccione</option>
                            <option  value="Si">Si</option>
                            <option  value="No">No</option>
                            </select>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
                    </div>
                </div>
            </div>
        )
    }
}

