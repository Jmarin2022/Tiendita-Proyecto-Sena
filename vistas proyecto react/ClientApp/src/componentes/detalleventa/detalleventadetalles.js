import { useEffect, useState } from "react";
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';

export function ListadoDetalleventa(props) {
    const [detalleventa, setDetalleVenta] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [ventaId, setVentaId] = useState(null);
    const [imagenes, setImagenes] = useState([]); // Agregamos el estado para las imágenes

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

    const obtenerImagenes = async () => { // Agregamos la función para obtener las imágenes
        const response = await fetch("api/imagen/Lista");
        if (response.ok) {
            const data = await response.json();
            setImagenes(data);
        } else {
            console.log("Error al obtener imágenes");
        }
    };

    useEffect(() => {
        obtenerDetallesVenta();
        obtenerVentas();
        obtenerImagenes(); // Llamamos a la función para obtener las imágenes

        const ventaIdFromUrl = window.location.pathname.split("/").pop();
        setVentaId(ventaIdFromUrl);
    }, []);

    const obtenerDetallesVentaComparados = () => {
        if (!ventaId || detalleventa.length === 0 || ventas.length === 0 || imagenes.length === 0) {
            return [];
        }

        const detallesVentaComparados = detalleventa.map((detalle) => {
            const nombreProducto = imagenes.find((imagen) => imagen.idImagen === detalle.productoId)?.nombre;
            return {
                ...detalle,
                nombreProducto: nombreProducto || 'Nombre no encontrado'
            };
        }).filter((detalle) => {
            return detalle.ventaId === parseInt(ventaId);
        });

        return detallesVentaComparados;
    };

    const detallesVentaComparados = obtenerDetallesVentaComparados();

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card">
                    <div className="card-header1">
                        <div className="Titulo1">
                            <h2 className="letra">Lista de categorías</h2>
                            <div className="btn-neon1">
                                <span id="span1"></span>
                                <span id="span2"></span>
                                <span id="span3"></span>
                                <span id="span4"></span>
                                <a href="/venta">Regresar</a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table1">
                            <thead>
                                <tr>
                                    <th className="raya" scope="col">Id del detalle</th>
                                    <th className="raya" scope="col">Id de la venta</th>
                                    <th className="raya" scope="col">Nombre del producto</th> {/* Cambiamos el encabezado */}
                                    <th className="raya" scope="col">Cantidad</th>
                                    <th className="raya" scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesVentaComparados.map((item) => (
                                    <tr key={item.id}>
                                        <td className="raya">{item.id}</td>
                                        <td className="raya">{item.ventaId}</td>
                                        <td className="raya">{item.nombreProducto}</td> {/* Mostramos el nombre del producto */}
                                        <td className="raya">{item.cantidad}</td>
                                        <td className="raya">{item.total}</td>
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
