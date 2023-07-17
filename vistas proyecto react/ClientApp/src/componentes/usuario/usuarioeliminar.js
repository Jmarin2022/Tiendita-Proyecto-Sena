
import React from 'react';
import axios from 'axios';

const Eliminarusuario = ({ Idusuario }) => {
    const eliminarusuario = async () => {
        try {
            const response = await axios.delete(`/api/usuario/Eliminar/${Idusuario}`);
            if (response.status === 200) {
                console.log('usuario eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarusuario}>Eliminar usuario</button>
        </div>
    );
};

export default Eliminarusuario;

