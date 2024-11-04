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
                                        <div className="productCheckout-price">${item.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="totalCheckout">Su Total es : ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                </div>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
            
        </div>
    );
};

export default Checkout;