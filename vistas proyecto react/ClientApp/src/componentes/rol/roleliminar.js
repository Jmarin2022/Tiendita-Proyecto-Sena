
import React from 'react';
import axios from 'axios';

const EliminarRol = ({ IdRol }) => {
    const eliminarRol = async () => {
        try {
            const response = await axios.delete(`/api/rol/Eliminar/${IdRol}`);
            if (response.status === 200) {
                console.log('Rol eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarRol}>Eliminar Rol</button>
        </div>
    );
};

export default EliminarRol;

