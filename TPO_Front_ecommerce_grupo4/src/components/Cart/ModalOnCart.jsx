import React from "react";

const ModalOnCart = ({ show, handleClose, product,quantity }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!show}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Producto agregado al carrito</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {product ? (
                            <>
                                <p>Se ha añadido el siguiente producto:</p>
                                <div>
                                    <strong>Nombre:</strong> {product.name}
                                </div>
                                <div>
                                    <strong>Precio:</strong> ${product.price}
                                </div>
                                <div>
                                    <strong>Cantidad agregada:</strong> {product.quantity}
                                </div>
                            </>
                        ) : (
                            <p>No se pudo agregar el producto al carrito.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalOnCart;