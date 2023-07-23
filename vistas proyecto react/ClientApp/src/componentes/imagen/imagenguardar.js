//import "bootsrap/dist/css/bootstrap.min.css"
import { Component } from "react";
import axios from 'axios';
import { NavBar } from '../principales/navbar'
import '../../assets/css/menu.css'

export class GuardarImagen extends Component {
    state = {
        Nombre: '',
        Descripcion: '',
        Stock: '',
        Precio: '',
        Categoria: '',
        StockMax: '',
        StockMin: '',
        Imagen1: null
    }

    changeHandler = (e) => {
        const { name, value, files } = e.target;
        this.setState({ [name]: files ? files[0] : value });
    }

    guardarImagen = async () => {
        const { Nombre, Descripcion, Stock, Precio, Categoria, StockMax, StockMin, Imagen1 } = this.state;

        try {
            // Step 1: Save the image with null value for Imagen1
            const formData = new FormData();
            formData.append('Nombre', Nombre);
            formData.append('Descripcion', Descripcion);
            formData.append('Stock', Stock);
            formData.append('Precio', Precio);
            formData.append('Categoria', Categoria);
            formData.append('StockMax', StockMax);
            formData.append('StockMin', StockMin);

            // Save the name of the image for later use
            const newImageName = Date.now().toString(); // You can generate a unique name using Date.now() or any other method
            formData.append('Imagen1', null); // Set the value of Imagen1 as null

            const response = await axios.post('api/imagen/Guardar', formData);

            // Step 2: Save the image in the desired location
            const imageExtension = Imagen1.name.split('.').pop();
            const imagePath = `./../assets/img/${newImageName}.${imageExtension}`;
            const imageURL = URL.createObjectURL(Imagen1);

            const image = new Image();
            image.src = imageURL;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, image.width, image.height);

                canvas.toBlob((blob) => {
                    const file = new File([blob], `${newImageName}.${imageExtension}`, { type: `image/${imageExtension}` });

                    // Save the image in the specified location
                    const formDataWithImage = new FormData();
                    formDataWithImage.append('Nombre', Nombre);
                    formDataWithImage.append('Descripcion', Descripcion);
                    formDataWithImage.append('Stock', Stock);
                    formDataWithImage.append('Precio', Precio);
                    formDataWithImage.append('Categoria', Categoria);
                    formDataWithImage.append('StockMax', StockMax);
                    formDataWithImage.append('StockMin', StockMin);
                    formDataWithImage.append('Imagen1', file);

                    axios.post('api/imagen/Guardar', formDataWithImage)
                        .then((response) => {
                            console.log(response);

                            // Step 3: Get the saved image from /api/imagen/Lista
                            axios.get('/api/imagen/Lista')
                                .then((response) => {
                                    const savedImage = response.data[0].imagen1; // Get the saved image
                                    const imagen1 = response.data[0].idImagen; // Get the idImagen

                                    // Step 4: Rename the image using /api/imagen/Editar
                                    const formDataRenameImage = new FormData();
                                    formDataRenameImage.append('id', response.data[0].id); // Assuming there's an id field in the response
                                    formDataRenameImage.append('Imagen1', imagen1);

                                    axios.post('/api/imagen/Editar', formDataRenameImage)
                                        .then((response) => {
                                            console.log(response);
                                            window.location.href = "/imagen";
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }, `image/${imageExtension}`);
            };
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div  >
                <NavBar />
                <div className="contenido1">
                    <div className="highlight contenidointeriorproducto">
                        <h2>Agregar Producto</h2>
                        <form onSubmit={this.submitHandler}>
                            <div className="Mitad1">
                                <div className="form-row">
                                    <p>Digite el nombre</p> 
                                    <input type="Text" name="Nombre" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite La descripcion</p> 
                                    <input type="Text" name="Descripcion" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock</p> 
                                    <input type="number" name="Stock" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Precio</p> 
                                    <input type="number" name="Precio" onChange={this.changeHandler}></input>
                                </div>
                            </div>
                            <div className="Mitad2">
                                <div>
                                    <p>Digite la Categoria</p> 
                                    <input type="Text" name="Categoria" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock Maximo</p> 
                                    <input type="number" name="StockMax" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Digite el Stock Minimo</p> 
                                    <input type="number" name="StockMin" onChange={this.changeHandler}></input>
                                </div>
                                <div>
                                    <p>Sube la imagen</p> 
                                    <input type="file" name="Imagen1" onChange={this.changeHandler} />
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary bajar1">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

