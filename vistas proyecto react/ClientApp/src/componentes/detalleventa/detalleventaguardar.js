import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';

import Swal from 'sweetalert2';
import Footer from '../principales/footer';

import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

export const ProductosFormulario = () => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({
        cantidad: '',
        nombre: '',
    });
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [cliente, setCliente] = useState('');
    const [ventaId, setVentaId] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [nombresProductosSeleccionados, setNombresProductosSeleccionados] = useState([]);

    const [productoInactivo, setProductoInactivo] = useState(false); // Estado para verificar si el producto está inactivo

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response1 = await axios.get('/api/imagen/Lista');
                setProductos(response1.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductos();
    }, []);

    useEffect(() => {
        const fetchUltimaVentaId = async () => {
            try {
                const response = await axios.get('/api/ventum/Lista');
                const ventaIdMax = Math.max(...response.data.map(item => item.Id));
                setVentaId(ventaIdMax);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUltimaVentaId();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value,
        });
        const selectedProducto = productos.find((item) => item.nombre === value);
        // Verificar si el producto seleccionado está inactivo

        if (selectedProducto) {
            setProductoInactivo(selectedProducto.estado === 'Inactivo');
        } else {
            setProductoInactivo(false); // Reiniciar el estado si no se encuentra el producto
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productoSeleccionado = productos.find((item) => item.nombre === producto.nombre);

        

        if (!productoSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Producto no encontrado en la lista de productos disponibles.'
            })
            return;
        }

        

        const stockActual = productoSeleccionado.stock;

        if (producto.cantidad > stockActual) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No hay suficiente cantidad para comprar ${producto.cantidad} unidades del producto.`
            })
            return;
        }

        // Agregar una comprobación para productos inactivos
        if (productoSeleccionado.estado === 'Inactivo') {
            Swal.fire({
                icon: 'warning',
                
                title: 'Este producto est&#225; inactivo y no se puede agregar a la lista de productos.'
            });
            return;
        }
        

        if (editIndex !== null) {
            const updatedProductosSeleccionados = [...productosSeleccionados];
            updatedProductosSeleccionados[editIndex] = {
                ...producto,
                idImagen: productoSeleccionado.idImagen,
                precio: productoSeleccionado.precio,
                subtotal: producto.cantidad * productoSeleccionado.precio,
            };
            setProductosSeleccionados(updatedProductosSeleccionados);
            setEditIndex(null);
        } else {
            const newProducto = {
                ...producto,
                idImagen: productoSeleccionado.idImagen,
                precio: productoSeleccionado.precio,
                subtotal: producto.cantidad * productoSeleccionado.precio,
            };
            setProductosSeleccionados([...productosSeleccionados, newProducto]);

            // Agregar el nombre del producto seleccionado a la lista de nombresProductosSeleccionados
            setNombresProductosSeleccionados([...nombresProductosSeleccionados, producto.nombre]);
        }
        setProducto({
            cantidad: '',
            nombre: '',
        });
    };

    const handleDelete = (index) => {
        const updatedProductosSeleccionados = [...productosSeleccionados];
        updatedProductosSeleccionados.splice(index, 1);
        setProductosSeleccionados(updatedProductosSeleccionados);
    };

    const handleEdit = (index) => {
        const selectedProducto = productosSeleccionados[index];
        setProducto(selectedProducto);
        setEditIndex(index);
    };

    const handleClienteChange = (event) => {
        const inputValue = event.target.value;

        // Validar la entrada utilizando una expresión regular que solo permita letras y números
        if (/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]*$/.test(inputValue)) {
            setCliente(inputValue);
        }
    };
    const handleCantidadChange = (event) => {
        const inputCantidad = event.target.value;
        // Validate input using the regular expression
        if (inputCantidad === '' || /^\d+$/.test(inputCantidad)) {
            setCantidad(inputCantidad);
        }
    };

    const handleKeyDown = (event) => {
        // Prevenir la entrada de la tecla 'e'
        if (event.key === 'e') {
            event.preventDefault();
        }
    };


    const handleGuardarVenta = async () => {
        // Calcular el total sumando los subtotales de los productos seleccionados
        const total = productosSeleccionados.reduce((acc, item) => acc + item.subtotal, 0);

        // Guardar los datos de la venta
        const ventaData = {
            Cliente: cliente,
            Fechaventa: new Date(),
            Total: total,
        };

        try {
            const ventaResponse = await axios.post('/api/ventum/Guardar', ventaData);
            const ventaId = ventaResponse.data.idVenta;
            setVentaId(ventaId);


            const response1 = await axios.get('/api/ventum/Lista');
            const idventa = response1.data[0].id;

            // Guardar los detalles de la venta
            productosSeleccionados.forEach(async (producto) => {
                const detalleVentaData = {
                    VentaId: idventa,
                    ProductoId: producto.idImagen,
                    Cantidad: producto.cantidad,
                    Total: producto.subtotal,
                };
                await axios.post('/api/detalleventa/Guardar', detalleVentaData);

                // Actualizar el campo stock para el producto vendido
                const idImagen = producto.idImagen;
                const productoSeleccionadoAPI = productos.find((item) => item.idImagen === idImagen);

                // Calcular el nuevo stock restando la cantidad vendida
                const nuevoStock = productoSeleccionadoAPI.stock - producto.cantidad;

                // Actualizar el campo stock en la API
                await axios.put(`/api/imagen/Editar/${idImagen}`, {
                    ...productoSeleccionadoAPI,
                    stock: nuevoStock,
                });
            });

            // Limpiar el formulario y el listado de productos seleccionados
            setCliente('');
            setProductosSeleccionados([]);
            setVentaId(null);
            setNombresProductosSeleccionados([]); // Limpiar la lista de nombres de productos seleccionados

            // Mostrar una alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Venta guardada correctamente.',
              
            });
        } catch (error) {
            console.error(error);
            // Mostrar una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar la venta.',
                text: 'Hubo un problema al intentar guardar la venta. Por favor, inténtalo nuevamente.',
            });
        }
    };

    // Filtra la lista de productos disponibles en el datalist para evitar mostrar los
    // productos que ya han sido seleccionados previamente
    const productosDisponibles = productos.filter((item) => !nombresProductosSeleccionados.includes(item.nombre));

    return (
        <div>
            <NavBar />
            <div className="modal-entrada">
                
                    {/*<div className="card-header1">                      */}
                    {/*        <h2 className="letra13">Crear venta</h2>*/}
                    {/*</div>*/}
                <form onSubmit={handleSubmit} >

                <div className="row">
                    <div className="col-md-3">
                        <label className="tituloentrada" htmlFor="cantidad">Producto</label>
                        <input
                            className={`form-control1 ${productoInactivo ? 'producto-inactivo' : ''}`}
                            list="productosList"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            placeholder="Buscar producto"
                        />
                        <datalist id="productosList">
                            {productosDisponibles.map((item, index) => (
                                <option key={index} value={item.nombre}>
                                    {item.nombre}
                                </option>
                            ))}
                        </datalist>
                        {productoInactivo && <p className="mensaje-error" style={{marginLeft:'90px'} }>Producto Inactivo</p>}
                    </div>

                        <div className="col-md-3">
                    
                        <label class="tituloentrada" htmlFor="cliente">Cliente</label>
                         <input className="form-control1" type="text" id="cliente" value={cliente} onChange={handleClienteChange} />
                           
                        </div>
                         

                        <div className="col-md-3">
                   
                        <label class="tituloentrada">Cantidad</label>
                        <input className="form-control1" type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} onKeyDown={handleKeyDown} />
                        </div>
                    

                    

                    <div className="col-md-3">
                        
                        <button className="btn btn-primary bajar1 col-sm" type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Agregar a la lista'}</button>
                        <Link to="/usuario" className="btn btn-primarycancelar bajar1  mx-3 ">Cancelar</Link >
                    </div>
                    </div>

                </form>
                <hr />
                <br />
                <h2 className="d-flex align-items-center justify-content-center mt-3 listaventaguardar">Lista de Productos</h2>
                
                

                <div className="">
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th className="raya" scope="col">Producto</th>
                                        <th className="raya" scope="col">Cantidad </th>
                                        <th className="raya" scope="col">Subtotal</th>
                                        <th className="raya" scope="col">Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosSeleccionados.map((item, index) => (
                                        <tr key={index}>
                                            <td className="raya">{item.nombre}</td>
                                            <td className="raya">{item.cantidad}</td>
                                            <td className="raya">{item.subtotal}</td>
                                            <td className="raya">
                                                <button className="btn espacio" onClick={() => handleDelete(index)}>
                                                    <BsTrash className="btn-outline-danger icon" />
                                                    <AiOutlineClose className="btn-outline-danger icon-open" />
                                                </button>
                                                <button className="btn espacio" onClick={() => handleEdit(index)}>
                                                    <BsPencil className="iconedit" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {productosSeleccionados.length > 0 && (
                                    <div>
                                <p className="px-2">Total: {productosSeleccionados.reduce((acc, item) => acc + item.subtotal, 0)}</p>
                                
                                   
                                    <button className="btn btn-primary my-2 mx-2" onClick={handleGuardarVenta}>Guardar Venta</button>
                                    
                                    </div>
                                )}
                    </table>
                </div>
            </div>
                   
           
            <Footer />
        </div>
    );
};
