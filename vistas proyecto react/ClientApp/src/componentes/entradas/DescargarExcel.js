import React from "react";
import { Link } from "react-router-dom";

export function DescargarExcel() {
    const handleDescargarExcel = () => {
        // Realiza una solicitud al endpoint del servidor para descargar el archivo Excel
        fetch("/api/entradum/DescargarExcel")
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
                a.download = "entradas.xlsx";

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Limpia la URL del objeto creado
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Descargar Excel</h2>
            <p>Haz clic en el botón para descargar el archivo Excel con la información de las entradas:</p>
            <button onClick={handleDescargarExcel}>Descargar Excel</button>
            <br />
            <Link to="/entradas">Volver al listado de entradas</Link>
        </div>
    );
}
