import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Resto de tu código...

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        width: '40%',
        fontWeight: 'bold',
    },
    value: {
        width: '60%',
    },
});

const ClientePDF = ({ clientes }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Lista de Clientes</Text>
                    {clientes.map((cliente) => (
                        <React.Fragment key={cliente.idCliente}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Documento:</Text>
                                <Text style={styles.value}>{cliente.documento}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Nombre:</Text>
                                <Text style={styles.value}>{cliente.nombre}</Text>
                            </View>
                            {/* Resto de tu contenido */}
                        </React.Fragment>
                    ))}
                </View>
            </Page>
        </Document>
    );
};

export default ClientePDF;
