import React, { useState } from 'react';
import axios from 'axios';

export const ImageUploaderHola = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        console.log(file)
    };

    const handleImageUpload = () => {
        if (!selectedImage) {
            console.error('No se ha seleccionado ninguna imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        // Realizar una petición al backend para enviar la imagen utilizando axios.
        axios.post('/api/imagen/Upload', formData)
            .then(response => {
                console.log('Imagen subida correctamente.');
            })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Subir Imagen</button>
        </div>
    );
};

