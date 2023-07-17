import React, { useState } from "react";

export function Modal({ RolSeleccionado, handleConfirmarEliminar }) {
    return (
        <div className="modal fade" id="confirmarEliminarModal" tabIndex="-1" aria-labelledby="confirmarEliminarModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmarEliminarModalLabel">Confirmar Eliminación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {RolSeleccionado && (
                            <p>¿Estás seguro de que deseas eliminar el rol {RolSeleccionado.rol1}?</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={handleConfirmarEliminar}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
