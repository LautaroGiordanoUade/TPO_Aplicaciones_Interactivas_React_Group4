import React, { useEffect, useState } from 'react';
import '../components/Cart.css';
import { getProductsCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const initialCartProducts = await getProductsCart();
                setProducts(initialCartProducts);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };
        fetchCartProducts();
    }, []);


    const handleRemoveCartProduct = (id) => {
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
    

    const handleCheckout = () => {
        navigate('/checkout', { state: { items: products, total: total } });
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
                            <p className="product-price">Precio:  ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                           
                            <button className='btn-remove' onClick={() => handleRemoveCartProduct(product.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
            <div className="total-container">
                <span className='total-pagar'>Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <button className='btn-clear-all' onClick={handleCleanCart}>
                    Vaciar Carrito
                </button>
            </div>
            <div>
            <button className='btn-checkout' onClick={handleCheckout}>
                    Realizar Compra
                </button>
            </div>
        </div>
    );
}

export default Cart;