import React, { useState } from "react";

export function Modal({ AgregarCategoria, modalVisible, setModalVisible }) {
    const [NombreC, setNombreC] = useState('');
    const [Estado, setEstado] = useState('');
    const [IdImagen, setIdImagen] = useState('');

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name === 'NombreC') {
            setNombreC(value);
        } else if (name === 'Estado') {
            setEstado(value);
        } else if (name === 'IdImagen') {
            setIdImagen(value);
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        const nuevaCategoria = {
            NombreC,
            Estado,
            IdImagen
        };
        AgregarCategoria(nuevaCategoria);
    };

    return (
        <div className={`modal ${modalVisible ? 'show' : ''}`} style={{ display: modalVisible ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmarAgegarModalLabel">Crear Categoría</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="highlight contenidointerior">
                            <form onSubmit={submitHandler}>
                                <div className="form-row">
                                    <p>Digite el nombre de la categoría</p>
                                    <input className="form-control" type="Text" name="NombreC" value={NombreC} onChange={changeHandler} required />
                                </div>
                                <div className="form-row">
                                    <p>Digite el estado de la categoría</p>
                                    <input className="form-control" type="Text" name="Estado" value={Estado} onChange={changeHandler} required />
                                </div>
                                <div className="form-row">
                                    <p>Digite la imagen de la categoría</p>
                                    <input className="form-control" type="Text" name="IdImagen" value={IdImagen} onChange={changeHandler} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalVisible(false)}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
