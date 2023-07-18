import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from "./Modal";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'
export function Listadoentradum() {
    const [entradums, setentradums] = useState([]);
    const [entradumSeleccionado, setentradumSeleccionado] = useState(null);

    const mostrarentradums = async () => {
        try {
            const response = await axios.get("/api/entradum/Lista");
            setentradums(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarentradum = async (idEntrada) => {
        try {
            const response = await axios.delete(`/api/entradum/Eliminar/${idEntrada}`);
            if (response.status === 200) {
                mostrarentradums();
                setentradumSeleccionado(null);
                window.location.href="/"
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        mostrarentradums();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString).toLocaleDateString("es-PE", options);
        const time = new Date(dateString).toLocaleTimeString();
        return `${date} | ${time}`;
    };

    const handleEliminarClick = (entradum) => {
        setentradumSeleccionado(entradum);
    };

    const handleConfirmarEliminar = () => {
        if (entradumSeleccionado) {
            eliminarentradum(entradumSeleccionado.idEntrada);

        }
    };

    return (
        <div className="container1">
            <NavBar />
            <div className="contenido">


                <div className="Titulo">
                    <h2 class="letra">Lista de las entradas</h2>
                    <div class="btn-neon ">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/entradas/guardar">Agregar</a>
                    </div>
                </div>


            <table className="table1">
                <thead>
                    <tr>
                        <th scope="col " className="raya">Id entradum</th>
                        <th scope="col " className="raya">id del producto</th>
                        <th scope="col " className="raya">Catidad</th>
                        <th scope="col " className="raya">Proveedor</th>
                        <th scope="col " className="raya">Fecha Registro</th>
                        <th scope="col " className="raya">Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entradums.map((entradum) => (
                        <tr key={entradum.IdEntrada}>
                            <td className="raya">{entradum.idEntrada}</td>
                            <td className="raya">{entradum.idProductos}</td>
                            <td className="raya">{entradum.cantidad}</td>
                            <td className="raya">{entradum.proveedor}</td>
                            <td className="raya">{formatDate(entradum.fecha)}</td>
                            <td className="raya corto">
                                <button onClick={() => handleEliminarClick(entradum)} data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal">Eliminar</button> |
                                <Link to={`/entradas/editar/${entradum.idEntrada}`}>Editar</Link> |
                                <Link to={`/entradas/detalles/${entradum.idEntrada}`}>Ver detalle</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para confirmar la eliminación */}
            <Modal entradumSeleccionado={entradumSeleccionado} handleConfirmarEliminar={handleConfirmarEliminar} />
            </div>
        </div>
    );
}
