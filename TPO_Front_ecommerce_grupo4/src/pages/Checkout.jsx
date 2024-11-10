import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/StyledCheckout.css';


const Checkout = () => {
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {items.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="nameProductCheckout">Producto</th>
                                <th className="nameprecioCheckout">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const totalPrice = item.price * item.quantityOnCart; 
                                return (
                                    <tr key={index} className="productCheckout-item">
                                        <td>
                                            <div className="productCheckout-name">X {item.quantityOnCart} {item.name} </div>
                                        </td>
                                        <td>
                                            <div className="productCheckout-price">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <p className="totalCheckout">Su total es ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                    <div>
                <button className='btn-checkout' >
                     Comprar
                </button>
                    </div>
                </div>

            ) : (
                <p>No hay productos en el carrito. ¿Qué esperás para agregar productos al carrito?</p>
            )}
        </div>
    );
};

export default Checkout;