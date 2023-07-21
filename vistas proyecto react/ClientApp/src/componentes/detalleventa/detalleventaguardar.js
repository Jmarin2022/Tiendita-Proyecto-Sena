import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { BiTrash } from 'react-icons/bi'; // Importar el icono de eliminación
import { BiBrush } from 'react-icons/bi';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedProductosSeleccionados = [...productosSeleccionados];
            updatedProductosSeleccionados[editIndex] = {
                ...producto,
                idImagen: productos.find((item) => item.nombre === producto.nombre).idImagen,
                precio: productos.find((item) => item.nombre === producto.nombre).precio,
                subtotal: producto.cantidad * productos.find((item) => item.nombre === producto.nombre).precio,
            };
            setProductosSeleccionados(updatedProductosSeleccionados);
            setEditIndex(null);
        } else {
            const newProducto = {
                ...producto,
                idImagen: productos.find((item) => item.nombre === producto.nombre).idImagen,
                precio: productos.find((item) => item.nombre === producto.nombre).precio,
                subtotal: producto.cantidad * productos.find((item) => item.nombre === producto.nombre).precio,
            };
            setProductosSeleccionados([...productosSeleccionados, newProducto]);
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
            
            // Guardar los detalles de la venta
            productosSeleccionados.forEach(async (producto) => {
                const response = await axios.get('/api/ventum/Lista');
                const response1 = await axios.get('/api/imagen/Lista');


                console.log(response); 
                console.log(response1);
                const hola = response.data[0].id

                console.log(producto);

                    

                const detalleVentaData = {
                    VentaId: hola,
                    ProductoId: producto.idImagen,
                    Cantidad: producto.cantidad,
                    Total: producto.subtotal,
                };
                await axios.post('/api/detalleventa/Guardar', detalleVentaData);
                window.location.href = "/venta";
            });

            // Limpiar el formulario y el listado de productos seleccionados
            setCliente('');
            setProductosSeleccionados([]);
            setVentaId(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card ">
                    <div className="card-header1">
                        <div className="Titulo1">
                            <h2 className="letra">Crear venta</h2>
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
                        <div className="Contenedor13">
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label" htmlFor="cliente">Nombre del Cliente:</label>
                                <div className="col-sm-9">
                                    <input className="form-control " type="text" id="cliente" value={cliente} onChange={handleClienteChange} />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <h2 className="letra1">Información del Producto para agregar</h2>
                                <div className="row">
                                    <div className="form-row col-sm-5">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <select class="form-select" id="nombre" name="nombre" value={producto.nombre} onChange={handleChange}>
                                            <option value="">Seleccionar producto</option>
                                            {productos.map((item, index) => (
                                                <option key={index} value={item.nombre}>
                                                    {item.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-row col-sm-5">
                                        <label htmlFor="cantidad">Cantidad:</label>
                                        <input className="form-control" type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} />
                                    </div>

                                    <button class="btn btn-primary bajar1 col-sm" type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Agregar Producto'}</button>
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
            
        </div> </div></div></div></div>
    );
};


