
import React from 'react';
import axios from 'axios';

const EliminarCliente = ({ idCliente }) => {
    const eliminarCliente = async () => {
        try {
            const response = await axios.delete(`/api/cliente/Eliminar/${idCliente}`);
            if (response.status === 200) {
                console.log('Cliente eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarCliente}>Eliminar Cliente</button>
        </div>
    );
};

export default EliminarCliente;

