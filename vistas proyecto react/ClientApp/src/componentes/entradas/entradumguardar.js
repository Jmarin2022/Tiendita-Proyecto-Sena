
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import '../../assets/css/menu.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min.js';


    import { NavBar } from '../principales/navbar'
    import Footer from '../principales/footer';

    import { BsTrash } from 'react-icons/bs';
    import { BsPencil } from 'react-icons/bs';
    import { AiOutlineClose } from 'react-icons/ai';
    import { Link, useLocation } from 'react-router-dom';
    import Swal from 'sweetalert2';
    


    export const GuardarEntradas = () => {
        const [productos, setProductos] = useState([]);
        const [nombre, setNombre] = useState('');
        const [cantidad, setCantidad] = useState('');
        const [proveedor, setProveedor] = useState('');
        const [proveedorError, setProveedorError] = useState('');
        const [proveedorInputError, setProveedorInputError] = useState(false); // Nuevo estado para el estilo de error
        const [precio, setPrecio] = useState(0);
        const [tablaData, setTablaData] = useState([]);
    
        const [productoInactivo, setProductoInactivo] = useState(false); // Estado para verificar si el producto está inactivo
        const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 16)); // Obtiene la fecha y hora actual y la formatea como string

        
       

        useEffect(() => {
            // Fetch the data from the API /api/imagen/Lista
            fetch('/api/imagen/Lista')
                .then((response) => response.json())
                .then((data) => setProductos(data))
                .catch((error) => console.log(error));
        }, []);

        const handleNombreChange = (event) => {
            const selectedNombre = event.target.value;
            setNombre(selectedNombre);
            // Find the selected product from the list and update the price
            const selectedProduct = productos.find((product) => product.nombre === selectedNombre);
            

            if (selectedProduct) {
                setPrecio(selectedProduct.precio);
                setProductoInactivo(selectedProduct.estado === 'Inactivo');
            } else {
                setProductoInactivo(false); // Si no se selecciona un producto, restablecer el estado
            }
        };

        const handleAgregar = () => {
            // Encontrar el producto seleccionado de la lista de productos
            const selectedProduct = productos.find((product) => product.nombre === nombre);

            if (!selectedProduct) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo vac&#237;o',
                    text: 'Seleccione un producto.'
                });
                return;
            }
        
            // Validar que haya un valor para el campo "Proveedor"
            if (!proveedor) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo vac&#237;o',
                    text: 'Ingrese un Proveedor'
                });
                return;
            }

            // Validar que haya un valor para el campo "Proveedor"
            if (!fecha) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo vac&#237;o',
                    text: 'Ingrese la fecha'
                });
                return;
            }
        

            // Convertir las cantidades a número3s enteros
            const cantidadNumerica = parseInt(cantidad, 10);
            const idImagenNumerico = parseInt(selectedProduct.idImagen, 10);
        
            // Validar que las cantidades sean números válidos
            if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
                Swal.fire({
                    icon: 'warning',
                
                    text: 'Ingrese una cantidad v&#225;lida.'
                });
                return;
            }


            // Agregar una comprobación para productos inactivos
            if (selectedProduct.estado === 'Inactivo') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Producto Inactivo',
                    text: 'Este producto está inactivo y no se puede agregar a la lista de entradas.'
                });
                return;
            }

            // Agregar el nuevo producto a la tabla
            const newData = {
                nombre: selectedProduct.nombre,
                cantidad: cantidadNumerica, // Usar la cantidad convertida a número
                proveedor, // Agregar el campo "Proveedor" al objeto newData
                precio: selectedProduct.precio,
                subtotal: cantidadNumerica * selectedProduct.precio,
                idImagen: idImagenNumerico, // Usar la idImagen convertida a número
            };

            setTablaData([...tablaData, newData]);
            setNombre(''); // Limpiar el input de "Nombre del producto"
            setCantidad(''); // Limpiar el input de "Cantidad"
            setProveedor(''); // Limpiar el input de "Proveedor"
        };

        const handleGuardar = async () => {
            // Verificar si la tabla está vacía antes de enviar los datos
            if (tablaData.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Accion Rechazada',
                    text: '...¡Debes agregar m&#237;nimo un producto a la tabla!...',
    });
                return;
            }

            try {
                // Guardar los detalles de la entrada y actualizar las cantidades de los productos
                for (const producto of tablaData) {
                    const detalleEntradaData = {
                        IdProductos: producto.idImagen,
                        Cantidad: producto.cantidad,
                        Proveedor: producto.proveedor,
                        Fecha: fecha,
                    };

                    // Guardar los detalles de la entrada
                    const entradaResponse = await axios.post('/api/entradum/Guardar', detalleEntradaData);

                    // Obtener la información actual del producto
                    const productoActualResponse = await axios.get(`/api/imagen/Detalles/${producto.idImagen}`);
                    const productoActual = productoActualResponse.data;

                    // Calcular la nueva cantidad del producto
                    const nuevaCantidad = productoActual.stock + producto.cantidad;

                    // Actualizar la cantidad del producto en la base de datos
                    await axios.put(`/api/imagen/Editar/${producto.idImagen}`, {
                        ...productoActual,
                        stock: nuevaCantidad,
                    });
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Entrada Guardada Correctamente',
               
                });
                return;
                setTablaData([]);
            } catch (error) {
                console.log(error);
                // Manejar el error si ocurriera algún problema en el servidor.
                alert('Error al guardar los datos. Por favor, inténtalo de nuevo.');
            }
        };

        const handleKeyDown = (event) => {
            // Prevenir la entrada de la tecla 'e'
            if (event.key === 'e') {
                event.preventDefault();
            }
        };


        const handleCantidadChange = (event) => {
            const inputCantidad = event.target.value;
            // Validate input using the regular expression
            if (inputCantidad === '' || /^\d+$/.test(inputCantidad)) {
                setCantidad(inputCantidad);
            }
        };

        const handleEditarCantidad = (index, newValue) => {
            // Validate the new value
            if (newValue === '' || newValue === '0') {
                Swal.fire({
                    icon: 'error',
                    title:'Error',
                    text: 'No se puede agregar 0 productos',
                

                });
                return;
            }

            // Convert the new value to a number
            const newCantidad = parseInt(newValue, 10);
        
            // Check if the new value is a valid number
            if (isNaN(newCantidad) || newCantidad < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    title: 'Ingrese una cantidad v&#225;lida.'


                });
                return;
            }

            // Copy the current state
            const updatedData = [...tablaData];
            // Update the cantidad field for the selected index
            updatedData[index].cantidad = newCantidad;
            // Update the subtotal based on the new cantidad
            updatedData[index].subtotal = newCantidad * updatedData[index].precio;
            // Update the state with the modified data
            setTablaData(updatedData);
        };

        const handleEliminarProducto = (index) => {
            // Copy the current state
            const updatedData = [...tablaData];
            // Remove the product at the selected index
            updatedData.splice(index, 1);
            // Update the state with the modified data
            setTablaData(updatedData);
        };

        const handleProveedorChange = (event) => {
            const inputValue = event.target.value;

            if (inputValue.length > 50) {
                setProveedorError('Solo se acepta 50 caracteres');
                setProveedorInputError(true); // Establecer el estilo de error
            } else {
                setProveedorError('');
                setProveedorInputError(false); // Quitar el estilo de error
            }

            // Validar la entrada utilizando una expresión regular que solo permita caracteres alfanuméricos
            if (/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]*$/.test(inputValue)) {
                setProveedor(inputValue);
            }
        };  


        return (
            <div>
                <NavBar />
               
                <div className="modal-entrada">
                    {/*<div className="contenidointeriorentrada">*/}


                    <div>
                        <div className="row">
                            
                            <div className="col-md-6">
                                <div className="">
                                    <label htmlFor="nombre" className="tituloentrada">Proveedor</label>
                                    <input
                                        type="text"
                                        className={`form-control1  ${proveedorInputError ? 'error' : ''}`}
                                        value={proveedor}
                                        style={{ marginBottom: 0 }}
                                        
                                        onChange={(e) => setProveedor(e.target.value), handleProveedorChange}
                                    />
                                    {proveedorError && <label className="error-messageproveerdor">{proveedorError}</label>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="">
                                    <p className="tituloentrada">Fecha</p>
                                    <input
                                        type="datetime-local"
                                        className="form-control1"
                                        value={fecha}
                                        readOnly // Agrega el atributo readOnly para hacer que el campo sea de solo lectura
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="nombreproducto">
                        <p className="margin01">Nombre del producto</p>
                        <input
                            className={`form-control ${productoInactivo ? 'producto-inactivo' : ''}`}
                            list="productosList"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            placeholder="Buscar producto"
                        />
                        {productoInactivo && <p className="mensaje-error">Producto Inactivo</p>}
                        <datalist id="productosList">
                            {productos.map((item, index) => (
                                <option key={index} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </datalist>
                        <div className="entradacantidad">
                            <p className="margin01">Cantidad </p>
                            <input className="form-control" type="number" value={cantidad} onChange={handleCantidadChange} onKeyDown={handleKeyDown} />
                        </div>
                        <div className="entradaagregar">
                            <button className="btn btn-primary bajar1 col-sm" onClick={handleAgregar}>Agregar</button>
                            <Link to="/entradas" className="btn btn-primarycancelar bajar1  mx-3 ">Cancelar</Link >
                        </div>
                    </div>

               

                <div className="tablaentrada">
                        <table className="table1">
                        <thead>
                            <tr>
                                <th className="raya">Nombre</th>
                                <th className="raya">Cantidad</th>
                                <th className="raya">Precio</th>
                                <th className="raya">Subtotal</th>
                                <th className="raya">Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaData.map((data, index) => (
                                <tr key={index}>
                                    <td className="raya">{data.nombre}</td>
                                    <td className="raya">{data.cantidad}</td>
                                    <td className="raya">{data.precio}</td>
                                    <td className="raya">{data.subtotal}</td>
                                    <td className="raya">
                                        <button className="btn" onClick={() => handleEditarCantidad(index, prompt('Ingrese la nueva cantidad:'))}>
                                            <BsPencil className="iconedit" />

                                        </button>
                                        <button className="btn espacio" onClick={() => handleEliminarProducto(index)}>
                                            <BsTrash className="btn-outline-danger icon" />
                                            <AiOutlineClose className="btn-outline-danger icon-open" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                            <button className="btn btn-primary bajar1 col-sm my-2 mx-2" onClick={handleGuardar}>Guardar Datos</button>
                    </table>
                    </div>
                    {/* Botón para guardar los datos de la tabla */}


                </div>
                <Footer />
            </div>

        );
    };
