import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };

    // Función para agrupar productos
    const groupedItems = items.reduce((acc, item) => {
        const existingItem = acc.find(product => product.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1; // Aumentar la cantidad
        } else {
            acc.push({ ...item, quantity: 1 }); // Agregar nuevo producto con cantidad
        }
        return acc;
    }, []);

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {groupedItems.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="nameProductCheckout">Producto</th>
                                <th className="nameprecioCheckout">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedItems.map((item, index) => {
                                const totalPrice = item.price * item.quantity;
                                return (
                                    <tr key={index} className="productCheckout-item">
                                        <td>
                                            <div className="productCheckout-name">X {item.quantity} {item.name} </div>
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
                </div>
            ) : (
                <p>No hay productos en el carrito. ¡Que esperas para agregar productos al carrito!</p>
            )}
        </div>
    );
};

export default Checkout;