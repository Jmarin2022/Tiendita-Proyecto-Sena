import React, { useEffect, useState } from "react";
import { NavBar } from '../principales/navbar';
import '../../assets/css/menu.css';
import { FaFilePdf } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import numeral from 'numeral';





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

    const [pdfData] = useState('Este es el contenido del PDF'); // Esto podría ser tu contenido de PDF dinámico




    const obtenerDetallesVenta = async () => {
        const response = await fetch("/api/detalleventa/Lista");
        if (response.ok) {
            const data = await response.json();
            setDetalleVenta(data);
        } else {
            console.log("Error al obtener detalles de venta");
        }
    };

    const handleDescargarExcel = () => {
        // Realiza una solicitud al endpoint del servidor para descargar el archivo Excel
        fetch("/api/detalleventa/DescargarExcel")
            .then((response) => {
                // Verifica si la respuesta es exitosa
                if (response.ok) {
                    // Convierte la respuesta en un blob (archivo binario)
                    return response.blob();
                } else {
                    throw new Error("Error al descargar el archivo Excel.");
                }
            })
            .then((blob) => {
                // Crea una URL de objeto para el blob
                const url = window.URL.createObjectURL(blob);

                // Crea un enlace temporal para descargar el archivo
                const a = document.createElement("a");
                a.href = url;
                a.download = "Detalle_de_la_venta.xlsx";

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Limpia la URL del objeto creado
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
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


    const PDFComponent = ({ detallesVentaComparados }) => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Detalle de la Venta</Text>
                        {detallesVentaComparados.map((detalle) => (
                            <View key={detalle.id} style={styles.content}>
                                <Text>{`ID del detalle: ${detalle.id}`}</Text>
                                <Text>{`ID de la venta: ${detalle.ventaId}`}</Text>
                                <Text>{`Nombre del producto: ${detalle.nombreProducto}`}</Text>
                                <Text>{`Cantidad: ${detalle.cantidad}`}</Text>
                                <Text>{`Total: ${detalle.total}`}</Text>
                            </View>
                        ))}
                    </View>
                </Page>
            </Document>
        );
    };

    const generateAndOpenPDF = () => {
        try {
            const pdf = (
                <PDFComponent detallesVentaComparados={detallesVentaComparados} />
            );

            const blobUrl = URL.createObjectURL(
                new Blob([pdf], { type: 'application/pdf' })
            );

            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.open();
                newWindow.document.write('<html><body>');
                newWindow.document.write('<embed width="100%" height="100%" src="' + blobUrl + '" type="application/pdf">');
                newWindow.document.write('</body></html>');
                newWindow.document.close();

                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl);
                }, 100);
            } else {
                throw new Error("No se pudo abrir una nueva ventana.");
            }
        } catch (error) {
            console.error("Error al generar o abrir el PDF:", error);
        }
    };



    return (
        <div>
            <NavBar />

            <div className="card">
                <div className="partedeltitulo">

                    <h2 className="letra">Lista de la venta</h2>
                    <div className="btn-neon letra2 my-2">
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        <a href="/venta">Regresar</a>
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
                                    <td className="raya">{numeral(item.total || 0).format('0,0.00')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginLeft: '38px' }}>
                    <button className="btn btn-primary bajar1 my-3" onClick={handleDescargarExcel}>Descargar Excel</button>
                </div>
            </div>
        </div>


    );
}