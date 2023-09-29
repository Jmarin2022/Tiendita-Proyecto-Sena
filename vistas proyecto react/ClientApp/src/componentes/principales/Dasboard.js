import React, { useEffect, useState } from 'react';
import '../../assets/css/menu.css';
import '../../assets/css/dashboard.css';
import { NavBar } from './navbar';
import axios from 'axios';
import numeral from 'numeral';

export function Dashboard() {
    const [ventasData, setVentasData] = useState([]);
    const [ventasPorDia, setVentasPorDia] = useState({});
    const [totalMax, setTotalMax] = useState(0);
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);
    const [productosMenosVendidos, setProductosMenosVendidos] = useState([]);
    const currentYear = new Date().getFullYear();
    const [ventasPorAno, setVentasPorAno] = useState(0);
    const [ventasPorMes, setVentasPorMes] = useState({});
    const currentYearr = new Date().getFullYear();

    useEffect(() => {
        obtenerProductosMasVendidos();
        obtenerProductosMenosVendidos(); // Aquí obtenemos los productos menos vendidos
        axios.get('/api/ventum/Lista')
            .then((res) => {
                setVentasData(res.data);

                const ventasPorDiaObj = {};
                const ventasPorMesObj = {};
                let totalVentasAno = 0;

                res.data.forEach((venta) => {
                    const fechaVenta = new Date(venta.fechaventa);
                    const dia = fechaVenta.getDate();
                    const mes = fechaVenta.getMonth() + 1;
                    const ano = fechaVenta.getFullYear();

                    // Ventas por día
                    if (!ventasPorDiaObj[dia]) {
                        ventasPorDiaObj[dia] = 0;
                    }
                    ventasPorDiaObj[dia] += venta.total;

                    // Ventas por mes
                    const mesKey = `${mes}-${currentYear}`;
                    if (!ventasPorMesObj[mesKey]) {
                        ventasPorMesObj[mesKey] = 0;
                    }
                    ventasPorMesObj[mesKey] += venta.total;

                    // Ventas por año
                    if (ano === currentYearr) {
                        totalVentasAno += venta.total;
                    }
                });

                setVentasPorDia(ventasPorDiaObj);
                setVentasPorMes(ventasPorMesObj);
                setVentasPorAno(totalVentasAno);

                const maxTotal = Math.max(...Object.values(ventasPorDiaObj));
                setTotalMax(maxTotal);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const mesesEnEspanol = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const currentMonthIndex = new Date().getMonth();
    const currentMonth = mesesEnEspanol[currentMonthIndex];

    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const itemsPerCard = Math.ceil(days.length / 3);

    const card1Days = days.slice(0, itemsPerCard);
    const card2Days = days.slice(itemsPerCard, 2 * itemsPerCard);
    const card3Days = days.slice(2 * itemsPerCard);

    const obtenerProductosMasVendidos = async () => {
        try {
            const response = await axios.get("api/detalleventa/MasVendidos");
            setProductosMasVendidos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerProductosMenosVendidos = async () => {
        try {
            const response = await axios.get("api/detalleventa/MenosVendidos");
            setProductosMenosVendidos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <NavBar />

            <div className="card">
                <div className="row">
                    <div className="partedeltitulo">
                        <h2 className="letra">Ventas de {currentMonth}</h2>
                    </div>
                    <div className="card-body">
                        <div className="cardgrande">
                            <div className="row">
                                <div className="col-md-4">
                                    <SalesCard days={card1Days} ventasPorDia={ventasPorDia} />
                                </div>
                                <div className="col-md-4">
                                    <SalesCard days={card2Days} ventasPorDia={ventasPorDia} />
                                </div>
                                <div className="col-md-4">
                                    <SalesCard days={card3Days} ventasPorDia={ventasPorDia} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="partedeltitulo">
                        <h2 className="letra">Ventas por Mes</h2>
                    </div>
                    <div className="card-body">
                        <div className="cardgrande">
                            <div className="row">
                                <div className="col-md-11">
                                    <SalesByMonth ventasPorMes={ventasPorMes} currentYear={currentYear} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <div className="partedeltitulo">
                        <h2 className="letra">Ventas por a&#241;o {currentYearr}</h2>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div style={{ float: 'left' }}>Total de Ventas del a&#241;o: {numeral(ventasPorAno || 0).format('0,0.00')}</div>
                </div>




            </div>

            <div className="div3">
                <h1 className="main-title">Productos M&#225;s Vendidos</h1>

                <table className="table">
                    <thead>
                        {/*<tr className="div4">Mas Vendidos</tr>*/}
                        <tr>
                            <th>#</th> {/* Agrega una columna para el contador */}
                            <th>Producto</th>
                            <th>Total Vendido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosMasVendidos.map((producto, index) => (
                            <tr key={producto.productoId} className="table-row">
                                <td>{index + 1}</td> {/* Muestra el contador del uno al diez */}
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.totalVendido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="div2">
                <h1 className="main-title">Productos Menos Vendidos</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th> {/* Agrega una columna para el contador */}
                            <th>Producto</th>
                            <th>Total Vendido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosMenosVendidos.map((producto, index) => (
                            <tr key={producto.productoId} className="table-row">
                                <td>{index + 1}</td> {/* Muestra el contador del uno al diez */}
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.totalVendido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>






        </div>
    );
}

function SalesCard({ days, ventasPorDia }) {
    return (
        <div className="card sales-card">
            <div className="card-body">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>D&#237;a</th>
                            <th>Ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((dia, index) => (
                            <tr key={index}>
                                <td>D&#237;a {dia}</td>
                                <td>{numeral(ventasPorDia[dia] || 0).format('0,0.00')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SalesByMonth({ ventasPorMes, currentYear }) {
    const months = Array.from({ length: 12 }, (_, i) => {
        const monthIndex = i + 1;
        const date = new Date(currentYear, monthIndex - 1, 1);
        const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
        return { index: monthIndex, name: monthName };
    });

    return (
        <table className="styled-table" style={{ marginLeft: '5%' }}>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Ventas</th>
                </tr>
            </thead>
            <tbody>
                {months.map(({ index, name }) => {
                    const mesKey = `${index}-${currentYear}`;
                    const total = ventasPorMes[mesKey] || 0;
                    return (
                        <tr key={mesKey}>
                            <td>{`${name} ${currentYear}`}</td>
                            <td>{numeral(total).format('0,0.00')}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}