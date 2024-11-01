import React, { useEffect, useState } from 'react';
import '../components/Cart.css';
import { getProductsCart } from '../services/cartService';

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const initialProducts = await getProductsCart();
                setProducts(initialProducts);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
                
            }
        };
        fetchProducts();
    }, []);


    const handleRemoveProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    useEffect(() => {
        const newTotal = products.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    }, [products]);

    const handleCleanCart = () => {
        setProducts([]); 
    };

    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de Compras</h3>
            
            <div className="products-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="product-item" key={product.id}>
                            {product.images.length>0 && (
                                <img 
                                src={product.images[0].imageBase64} 
                                alt={product.name}
                                className='produc-image'
                                />
                                )}     
                            <h4 className="product-name">{product.name}</h4>
                            <p className="product-price">Precio: ${product.price}</p>
                            <button className='btn-remove' onClick={() => handleRemoveProduct(product.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
            <div className="total-container">
                <span className='total-pagar'>Total: ${total.toFixed(2)}</span>
                <button className='btn-clear-all' onClick={handleCleanCart}>
                    Vaciar Carrito
                </button>
            </div>
        </div>
    );
}

export default Cart;