import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
export function Listadoventa() {
    const [venta, setventa] = useState([]);
    const [ setventaeleccionado] = useState(null);

    const mostrarventa = async () => {
        try {
            const response = await axios.get("/api/ventum/Lista");
            setventa(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    /*const eliminarventa = async (Id) => {
        try {
            const response = await axios.delete(`/api/ventum/Eliminar/${Id}`);
            if (response.status === 200) {
                mostrarventa();
                setventaeleccionado(null);
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error);
        }
    };*/

    useEffect(() => {
        mostrarventa();
    }, []);


    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de las ventas</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/ventas/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table1">
                <thead>
                    <tr>
                       <th scope="col " className="raya">Id venta</th>
                       <th scope="col " className="raya">Cliente</th>
                       <th scope="col " className="raya">Fecha de la venta</th>
                       <th scope="col " className="raya">Total</th>
                       <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {venta.map((venta) => (
                        <tr key={venta.Id}>
                           <td className="raya">{venta.id}</td>
                           <td className="raya">{venta.cliente}</td>
                           <td className="raya">{venta.fechaventa}</td>
                           <td className="raya">{venta.total}</td>
                            <td className="raya corto">
                                <Link to={`/venta/detalles/${venta.id}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            </div>
        </div>
    );
}
