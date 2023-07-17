//import "bootsrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

export function Listadorolespermiso(props) {

    const [rolespermiso, setrolespermiso] = useState([])


    const mostrarolespermiso = async () => {

        const response = await fetch("api/rolespermiso/Lista");

        if (response.ok) {

            const data = await response.json();
            setrolespermiso(data);
        } else {
            console.log("status code " + response.status);
        }

    }

    useEffect(() => {
        mostrarolespermiso();

    }, [])

    return (
        <div className="container bd-dark p-4 vh-100">
            <h2 className="text-white">Lista de los permisos de los roles</h2>
            <div className="row">
                <div className="col-sm-12"></div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {
                            rolespermiso.map(
                                (item) => (
                                    <table class="table">
                                        <div key={item.idRolPermisos} className="list-group-item list-group-item-action">
                                            <thead>
                                                <tr>
                                                    <th scope="col">IdRolPermisos</th>
                                                    <th scope="col">IdRol</th>
                                                    <th scope="col">IdPermisos</th>
                                                    <th scope="col">Operaciones</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th>{item.idRolPermisos}</th>
                                                    <th>{item.idRol}</th>
                                                    <td>{item.idPermisos}</td>
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