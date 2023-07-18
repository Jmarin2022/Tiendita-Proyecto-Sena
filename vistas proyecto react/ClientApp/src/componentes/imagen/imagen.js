import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
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
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de los Productos</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/imagen/guardar">Agregar</a>

                    </div>
                </div>


                <table className="table2">
                <thead>
                    <tr>
                         <th scope="col " className="raya">Id imagen</th>
                         <th scope="col " className="raya">Nombre</th>
                         <th scope="col " className="raya">Stock</th>
                         <th scope="col " className="raya">Precio</th>
                         <th scope="col " className="raya">Categoria</th>
                         <th scope="col " className="raya">StockMax</th>
                         <th scope="col " className="raya">StockMin</th>
                         <th scope="col " className="raya">Imagen1</th>
                         <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {imagen.map((imagen) => (
                        <tr key={imagen.IdImagen}>
                            <td className="raya">{imagen.idImagen}</td>
                            <td className="raya">{imagen.nombre}</td>
                            <td className="raya">{imagen.stock}</td>
                            <td className="raya">{imagen.precio}</td>
                            <td className="raya">{imagen.categoria}</td>
                            <td className="raya">{imagen.stockMax}</td>
                            <td className="raya">{imagen.stockMin}</td>
                            <td className="raya">{imagen.imagen1}</td>
                            <td className="raya corto">
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
            </div>
        </div>
    );
}
