//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
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
            <div className="container1">
                <NavBar />
                <div className="contenido">
                    <div className="highlight contenidointeriorproducto">
                        <h2>Agregar Producto</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="Mitad1">
                                <div className="form-row">
                                    <p>Digite el nombre</p> 
                                    <input type="Text" name="Nombre" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite La descripcion</p> 
                                    <input type="Text" name="Descripcion" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock</p> 
                                    <input type="number" name="Stock" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Precio</p> 
                                    <input type="number" name="Precio" onChange={this.changeHandler}></input>
                                </div>
                            </div>
                            <div className="Mitad2">
                                <div>
                                    <p>Digite la Categoria</p> 
                                    <input type="Text" name="Categoria" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock Maximo</p> 
                                    <input type="number" name="StockMax" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock Minimo</p> 
                                    <input type="number" name="StockMin" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Sube la imagen</p> 
                                    <input type="text" name="Imagen1" onChange={this.changeHandler}></input>
                                </div>
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

