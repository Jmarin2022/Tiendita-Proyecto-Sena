
import React from 'react';
import axios from 'axios';

const Eliminarpermisos = ({ IdPermisos }) => {
    const eliminarpermisos = async () => {
        try {
            const response = await axios.delete(`/api/permiso/Eliminar/${IdPermisos}`);
            if (response.status === 200) {
                console.log('permiso eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarpermisos}>Eliminar permiso</button>
        </div>
    );
};

export default Eliminarpermisos;

