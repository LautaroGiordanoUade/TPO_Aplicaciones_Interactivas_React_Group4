import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalCart = ({ showModal, handleClose, items, total,quantityOfProduct }) => {
    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Productos Fuera de Stock</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {items.length > 0 ? (
                            <>
                                <p>Los siguientes productos están fuera de stock:</p>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad solicitada</th>
                                            <th>Stock disponible</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => {
                                            const totalPrice = item.price * item.quantity; 
                                            return (
                                                <tr key={item.id}>
                                                    <td> {item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{quantityOfProduct}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>No hay productos fuera de stock.</p>
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

export default ModalCart;