import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';
import Swal from 'sweetalert2';


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
    const [nombresProductosSeleccionados, setNombresProductosSeleccionados] = useState([]);

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

    const handleClienteChange = (e) => {
        setCliente(e.target.value);
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
                text: `El número de venta es: ${ventaId}`,
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
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                        <div className="Titulo1">
                            <h2 className="letra">Crear venta</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="Contenedor13">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="cliente">Nombre del Cliente:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" type="text" id="cliente" value={cliente} onChange={handleClienteChange} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h2 className="letra1">Información del Producto para agregar</h2>
                                <div className="row">
                                    <div className="form-row col-sm-5">
                                        <label htmlFor="cantidad">busque el nombre del producto:</label>
                                        <input
                                            className="form-control"
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
                                    </div>

                                    <div className="form-row col-sm-5">
                                        <label htmlFor="cantidad">Cantidad:</label>
                                        <input className="form-control" type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} />
                                    </div>

                                    <button className="btn btn-primary bajar1 col-sm" type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Agregar Producto'}</button>
                                </div>
                            </form>

                            <h2 className="letra1">Listado de Productos</h2>
                            <table className="table1">
                                <thead>
                                    <tr>
                                        <th className="raya" scope="col">Nombre del producto</th>
                                        <th className="raya" scope="col">Catidad del producto</th>
                                        <th className="raya" scope="col">Subtotal del producto</th>
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
                                                <button className="btn btn-outline-danger espacio" onClick={() => handleDelete(index)}>
                                                    <BiTrash />
                                                </button>
                                                <button className="btn btn-primary espacio" onClick={() => handleEdit(index)}>
                                                    <BiBrush />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {productosSeleccionados.length > 0 && (
                                    <div>
                                        <p>Total: {productosSeleccionados.reduce((acc, item) => acc + item.subtotal, 0)}</p>
                                        <button className="btn btn-primary bajar1" onClick={handleGuardarVenta}>Guardar Venta</button>
                                    </div>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
