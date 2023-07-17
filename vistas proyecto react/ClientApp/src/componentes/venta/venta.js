import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <div className="container">
            <h2>Lista de venta</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id venta</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha de la venta</th>
                        <th scope="col">Total</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {venta.map((venta) => (
                        <tr key={venta.Id}>
                            <td>{venta.id}</td>
                            <td>{venta.cliente}</td>
                            <td>{venta.fechaventa}</td>
                            <td>{venta.total}</td>
                            <td>
                                <Link to={`/venta/detalles/${venta.id}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Link to="/ventas/guardar">Crear venta</Link>
        </div>
    );
}
