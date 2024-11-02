import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {items.length > 0 ? (
                <div className="productCheckout-list">
                    <table>
                        <thead>
                            <tr>
                                <th className="nameProductCheckout">Producto</th>
                                <th className="nameprecioCheckout">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} className="productCheckout-item">
                                    <td>
                                        <div className="productCheckout-name">{item.name}</div>
                                    </td>
                                    <td>
                                        <div className="productCheckout-price">${item.price.toFixed(2)}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
            <p className="totalCheckout">Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Checkout;