
import React from 'react';
import axios from 'axios';

const Eliminarimagen = ({ IdImagen }) => {
    const eliminarimagen = async () => {
        try {
            const response = await axios.delete(`/api/imagen/Eliminar/${IdImagen}`);
            if (response.status === 200) {
                console.log('imagen eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarimagen}>Eliminar imagen</button>
        </div>
    );
};

export default Eliminarimagen;

