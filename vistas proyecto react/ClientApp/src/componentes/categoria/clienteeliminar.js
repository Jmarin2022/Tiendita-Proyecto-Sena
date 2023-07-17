
import React from 'react';
import axios from 'axios';

const Eliminarcategoria = ({ idCategoria }) => {
    const eliminarcategoria = async () => {
        try {
            const response = await axios.delete(`/api/categoria/Eliminar/${idCategoria}`);
            if (response.status === 200) {
                console.log('categoria eliminado correctamente');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={eliminarcategoria}>Eliminar categoria</button>
        </div>
    );
};

export default Eliminarcategoria;

