//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export class GuardarVenta extends Component {

    constructor(props) {
        super(props)
        this.State = {
            Cliente: '',
            Fechaventa: '',
            Total: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('api/ventum/Guardar', this.state)
            .then(response => {
                console.log(response)
                window.location.href = "ventas";
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div >
                <form onSubmit={this.submitHandler}>
                    <div>
                        <p>Digite el nombre del cliente</p><br />
                        <input type="text" name="Cliente"  onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite la fecha de la venta</p><br />
                        <input type="date" name="Fechaventa" onChange={this.changeHandler} ></input>
                    </div>
                    <div>
                        <p>Digite el total</p><br />
                        <input type="number" name="Total" onChange={this.changeHandler} ></input>
                    </div>
                    <Link to="/venta" className="btn btn-primarycancelar bajar1 my-3 mx-3 ">Cancelar</Link >
                    <button type="submit" >Enviawr</button>
                </form>
            </div>
        )
    }
}

