//import "bootsrap/dist/css/bootstrap.min.css"
import React from "react";
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export function Inicio(props) {

    return (
        <div  >
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Dasboard</h2>
                </div>
            </div>
        </div>
    )
}
