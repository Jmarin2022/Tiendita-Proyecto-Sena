//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

export function Listadodetalleventa(props) {

    const [detalleventa, setdetalleventa] = useState([])


    const mostradetalleventa = async () => {

        const response = await fetch("api/detalleventa/Lista");

        if (response.ok) {

            const data = await response.json();
            setdetalleventa(data);
        } else {
            console.log("status code " + response.status);
        }

    }

    useEffect(() => {
        mostradetalleventa();

    }, [])

    return (
        <div className="container bd-dark p-4 vh-100">
            <h2 className="text-white">Lista de los detalles de las ventas</h2>
            <div className="row">
                <div className="col-sm-12"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            detalleventa.map(
                                (item) => (
                                    <table class="table">
                                        <div key={item.id} className="list-group-item list-group-item-action">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id del datalle</th>
                                                    <th scope="col">id de la venta</th>
                                                    <th scope="col">id del producto</th>
                                                    <th scope="col">cantidad</th>
                                                    <th scope="col">total</th>
                                                    <th scope="col">Operaciones</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th>{item.id}</th>
                                                    <th>{item.ventaId}</th>
                                                    <td>{item.productoId}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>{item.total}</td>
                                                    <td>hola</td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </table>

                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
//export default ListadoCliente;