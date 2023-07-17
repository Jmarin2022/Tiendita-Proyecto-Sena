//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';

export class GuardarImagen extends Component {

    constructor(props) {
        super(props)
        this.State = {
            Nombre: '',
            Descripcion: '',
            Stock: '',
            Precio: '',
            Categoria: '',
            StockMax: '',
            StockMin: '',
            Imagen1: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/imagen/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "imagen";
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
                        <p>Digite el nombre</p><br />
                        <input type="Text" name="Nombre"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite La descripcion</p><br />
                        <input type="Text" name="Descripcion"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el Stock</p><br />
                        <input type="number" name="Stock"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el Precio</p><br />
                        <input type="number" name="Precio" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite la Categoria</p><br />
                        <input type="Text" name="Categoria"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el Stock Maximo</p><br />
                        <input type="number" name="StockMax" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el Stock Minimo</p><br />
                        <input type="number" name="StockMin" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Sube la imagen</p><br />
                        <input type="text" name="Imagen1"  onChange={this.changeHandler} ></input>
                    </div>
                    <button type="submit" >Enviar</button>
                </form>
            </div>
        )
    }
}

