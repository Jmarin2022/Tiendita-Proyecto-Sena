//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

export function Listadodetalleventa(props) {

    const [detalleventa, setDetalleVenta] = useState([]);
    const [ventas, setVentas] = useState([]);

    const obtenerDetallesVenta = async () => {
        const response = await fetch("api/detalleventa/Lista");
        if (response.ok) {
            const data = await response.json();
            setDetalleVenta(data);
        } else {
            console.log("Error al obtener detalles de venta");
        }
    };

    const obtenerVentas = async () => {
        const response = await fetch("api/ventum/Lista");
        if (response.ok) {
            const data = await response.json();
            setVentas(data);
        } else {
            console.log("Error al obtener ventas");
        }
    };

    useEffect(() => {
        obtenerDetallesVenta();
        obtenerVentas();
    }, []);

    // Función para comparar los campos y obtener los detalles de venta coincidentes
    const obtenerDetallesVentaComparados = () => {
        if (detalleventa.length === 0 || ventas.length === 0) {
            return [];
        }

        const detallesVentaComparados = detalleventa.filter((detalle) => {
            return ventas.some((venta) => venta.id === detalle.ventaId);
        });

        return detallesVentaComparados;
    };

    const detallesVentaComparados = obtenerDetallesVentaComparados();

    return (
        <div className="container bd-dark p-4 vh-100">
            <h2 className="text-white">Lista de los detalles de las ventas</h2>
            <div className="row">
                <div className="col-sm-12"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id del detalle</th>
                                    <th scope="col">Id de la venta</th>
                                    <th scope="col">Id del producto</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesVentaComparados.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.ventaId}</td>
                                        <td>{item.productoId}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.total}</td>
                                        <td>hola</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
