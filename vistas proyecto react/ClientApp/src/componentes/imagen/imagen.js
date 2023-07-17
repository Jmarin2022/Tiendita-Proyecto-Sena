import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Listadoimagen() {
    const [imagen, setimagen] = useState([]);
    const [imagenSeleccionado, setimageneleccionado] = useState(null);

    const mostrarimagen = async () => {
        try {
            const response = await axios.get("/api/imagen/Lista");
            setimagen(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarimagen = async (IdImagen) => {
        try {
            const response = await axios.delete(`/api/imagen/Eliminar/${IdImagen}`);
            if (response.status === 200) {
                mostrarimagen();
                setimageneleccionado(null);
                window.location.href = "/"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarimagen();
    }, []);

    const handleEliminarClick = (imagen) => {
        setimageneleccionado(imagen);
    };

    const handleConfirmarEliminar = () => {
        if (imagenSeleccionado) {
            eliminarimagen(imagenSeleccionado.idImagen);

        }
    };

    return (
        <div className="container">
            <h2>Lista de imagen</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id imagen</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">StockMax</th>
                        <th scope="col">StockMin</th>
                        <th scope="col">Imagen1</th>
                        <th scope="col">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {imagen.map((imagen) => (
                        <tr key={imagen.IdImagen}>
                            <td>{imagen.idImagen}</td>
                            <td>{imagen.nombre}</td>
                            <td>{imagen.descripcion}</td>
                            <td>{imagen.stock}</td>
                            <td>{imagen.precio}</td>
                            <td>{imagen.categoria}</td>
                            <td>{imagen.stockMax}</td>
                            <td>{imagen.stockMin}</td>
                            <td>{imagen.imagen1}</td>
                            <td>
                                <button onClick={() => handleEliminarClick(imagen)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/imagen/editar/${imagen.idImagen}`}>Editar</Link> |
                                <Link to={`/imagen/detalles/${imagen.idImagen}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal imagenSeleccionado={imagenSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            <Link to="/imagen/guardar">Crear imagen</Link>
        </div>
    );
}
