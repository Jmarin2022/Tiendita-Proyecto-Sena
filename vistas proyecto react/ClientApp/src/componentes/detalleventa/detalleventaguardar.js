import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                const response = await axios.get('/api/imagen/Lista');
                setProductos(response.data);
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
                ProductoId: productos.find((item) => item.nombre === producto.nombre).idProducto,
                precio: productos.find((item) => item.nombre === producto.nombre).precio,
                subtotal: producto.cantidad * productos.find((item) => item.nombre === producto.nombre).precio,
            };
            setProductosSeleccionados(updatedProductosSeleccionados);
            setEditIndex(null);
        } else {
            const newProducto = {
                ...producto,
                ProductoId: productos.find((item) => item.nombre === producto.nombre).idProducto,
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
            Fechaventa: new Date().toISOString(),
            Total: total,
        };

        try {
            const ventaResponse = await axios.post('/api/ventum/Guardar', ventaData);
            const ventaId = ventaResponse.data.idVenta;
            setVentaId(ventaId);
            
            // Guardar los detalles de la venta
            productosSeleccionados.forEach(async (producto) => {
                const response = await axios.get('/api/ventum/Lista');

                // Obtén el ID más algo (por ejemplo, 5) del primer elemento del objeto
                for (var x = 0; x > response.length; x++) {
                    console.log(response)
                }
                const mayor = response.length
                const idmasalta = response[0];

                console.log(Math.max(response));

                console.log(mayor)

                const detalleVentaData = {
                    VentaId: idmasalta,
                    ProductoId: producto.ProductoId,
                    Cantidad: producto.cantidad,
                    Total: producto.subtotal,
                };
                await axios.post('/api/detalleventa/Guardar', detalleVentaData);
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
            <h2>Formulario de Productos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input type="number" id="cantidad" name="cantidad" value={producto.cantidad} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <select id="nombre" name="nombre" value={producto.nombre} onChange={handleChange}>
                        <option value="">Seleccionar producto</option>
                        {productos.map((item, index) => (
                            <option key={index} value={item.nombre}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Agregar Producto'}</button>
            </form>

            <h2>Información del Cliente</h2>
            <div>
                <label htmlFor="cliente">Nombre del Cliente:</label>
                <input type="text" id="cliente" value={cliente} onChange={handleClienteChange} />
            </div>

            <h2>Listado de Productos</h2>
            <ul>
                {productosSeleccionados.map((item, index) => (
                    <li key={index}>
                        Cantidad: {item.cantidad}, Nombre: {item.nombre}, Subtotal: {item.subtotal}
                        <button onClick={() => handleEdit(index)}>Editar</button>
                        <button onClick={() => handleDelete(index)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {productosSeleccionados.length > 0 && (
                <div>
                    <p>Total: {productosSeleccionados.reduce((acc, item) => acc + item.subtotal, 0)}</p>
                    <button onClick={handleGuardarVenta}>Guardar Venta</button>
                </div>
            )}
        </div>
    );
};


