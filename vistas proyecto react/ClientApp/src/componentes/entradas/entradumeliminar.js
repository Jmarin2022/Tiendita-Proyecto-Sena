
import React from 'react';
import axios from 'axios';

const Eliminarentradum = ({ IdEntrada }) => {
    const eliminarentradum = async () => {
        try {
            const response = await axios.delete(`/api/entradum/Eliminar/${IdEntrada}`);
            if (response.status === 200) {
                console.log('entradum eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarentradum}>Eliminar entradum</button>
        </div>
    );
};

export default Eliminarentradum;

