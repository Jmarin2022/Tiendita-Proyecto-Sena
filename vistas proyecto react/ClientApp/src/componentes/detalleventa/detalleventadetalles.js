import React, { useEffect, useState } from "react";
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { FaFilePdf } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    // Estilos para el PDF (los mismos que en tu código anterior)
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 12,
        marginBottom: 3,
    },
});

export function ListadoDetalleventa(props) {
    const [detalleventa, setDetalleVenta] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [ventaId, setVentaId] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [datosCargados, setDatosCargados] = useState(false); // Estado para controlar si los datos han sido cargados

    const obtenerDetallesVenta = async () => {
        const response = await fetch("api/detalleventa/Lista");
        if (response.ok) {
            const data = await response.json();
            setDetalleVenta(data);
        } else {
            console.log("Error al obtener detalles de venta");
        }
    };

    const obtenerVentas = async () => {
        const response = await fetch("api/ventum/Lista");
        if (response.ok) {
            const data = await response.json();
            setVentas(data);
        } else {
            console.log("Error al obtener ventas");
        }
    };

    const obtenerImagenes = async () => {
        const response = await fetch("api/imagen/Lista");
        if (response.ok) {
            const data = await response.json();
            setImagenes(data);
        } else {
            console.log("Error al obtener imágenes");
        }
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            await obtenerDetallesVenta();
            await obtenerVentas();
            await obtenerImagenes();
            setDatosCargados(true);
        };

        obtenerDatos();

        const ventaIdFromUrl = window.location.pathname.split("/").pop();
        setVentaId(ventaIdFromUrl);
    }, []);

    const obtenerDetallesVentaComparados = () => {
        if (!datosCargados) {
            return [];
        }

        const detallesVentaComparados = detalleventa.map((detalle) => {
            const nombreProducto = imagenes.find((imagen) => imagen.idImagen === detalle.productoId)?.nombre;
            return {
                ...detalle,
                nombreProducto: nombreProducto || 'Nombre no encontrado'
            };
        }).filter((detalle) => {
            return detalle.ventaId === parseInt(ventaId);
        });

        return detallesVentaComparados;
    };

    const detallesVentaComparados = obtenerDetallesVentaComparados();

    // Componente para el contenido del PDF
    const generatePDF = async () => {
        // Verificar si detallesVentaComparados tiene datos
        if (detallesVentaComparados.length === 0) {
            console.log("No hay datos para generar el PDF.");
            return;
        }

        // Componente para el contenido del PDF
        const DetalleVentaPDF = ({ detallesVentaComparados }) => (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Detalle de la Venta</Text>
                        <Text style={styles.subTitle}>Fecha: {new Date().toLocaleString()}</Text>
                        <Text style={styles.subTitle}>Venta ID: {ventaId}</Text>
                    </View>
                    <View style={styles.section}>
                        {detallesVentaComparados.map((item) => (
                            <Text key={item.id} style={styles.content}>
                                {item.nombreProducto} - Cantidad: {item.cantidad} - Total: {item.total}
                            </Text>
                        ))}
                    </View>
                </Page>
            </Document>
        );

        // Obtener el JSX del componente DetalleVentaPDF
        const detalleVentaPDFInstance = (
            <DetalleVentaPDF detallesVentaComparados={detallesVentaComparados} />
        );

        // Generar el Blob del PDF usando el componente PDFDownloadLink
        const { blob } = await (
            <PDFDownloadLink
                document={detalleVentaPDFInstance}
                fileName={`detalle_venta_${ventaId}.pdf`}
            >
                {({ blob, loading }) => (loading ? 'Generando PDF...' : blob)}
            </PDFDownloadLink>
        );

        // Revocar el enlace de descarga anterior (si existe)
        if (window.pdfDownloadLink) {
            window.pdfDownloadLink.revokeObjectURL();
        }

        // Crear el enlace de descarga y descargar el PDF
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `detalle_venta_${ventaId}.pdf`;
        document.body.appendChild(link);
        link.click();

        // Guardar el enlace de descarga para poder revocarlo posteriormente
        window.pdfDownloadLink = link;
    };





    return (
        <div>
            <NavBar />
            <div className="margin0">
                <div className="card">
                    <div className="card-header1">
                        <div className="Titulo1">
                            <h2 className="letra">Lista de categorías</h2>
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
                        <table className="table1">
                            <thead>
                                <tr>
                                    <th className="raya" scope="col">Id del detalle</th>
                                    <th className="raya" scope="col">Id de la venta</th>
                                    <th className="raya" scope="col">Nombre del producto</th>
                                    <th className="raya" scope="col">Cantidad</th>
                                    <th className="raya" scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesVentaComparados.map((item) => (
                                    <tr key={item.id}>
                                        <td className="raya">{item.id}</td>
                                        <td className="raya">{item.ventaId}</td>
                                        <td className="raya">{item.nombreProducto}</td>
                                        <td className="raya">{item.cantidad}</td>
                                        <td className="raya">{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pdf-button">
                        <button onClick={generatePDF}>
                            Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
