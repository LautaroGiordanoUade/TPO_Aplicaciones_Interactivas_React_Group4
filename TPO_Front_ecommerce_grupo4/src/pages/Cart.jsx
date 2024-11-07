import React, { useEffect, useState } from 'react';
import '../components/Cart.css';
import { getProductsCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [cartHasError, setcartHasError] = useState(false);
    const [cartErrorMessage, setcartErrorMessage] = useState("");

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

    const handlerfetchCartProducts = async () => {
        try {
            const initialCartProducts = await getProductsCart();
            setProducts(initialCartProducts);
        } catch (error) {
            console.log('Error al cargar los productos del carrito:', error);
            setcartHasError(true);
            setcartErrorMessage(error.message || 'Ocurrió un error.');
        }
    };

    useEffect(() => {
        handlerfetchCartProducts();
    }, []);

    const handlerRemoveCartProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
    };

    useEffect(() => {
        const newTotal = products.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    }, [products]);

    const handlerCleanCart = () => {
        setProducts([]); 
    };
    
    const handlerCheckout = () => {
        navigate('/checkout', { state: { items: products, total: total } });
    };

    // Función para agrupar productos
    const groupedProducts = products.reduce((acc, product) => {
        const existingProduct = acc.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1; // Aumentar la cantidad
        } else {
            acc.push({ ...product, quantity: 1 }); // Agregar nuevo producto con cantidad
        }
        return acc;
    }, []);
    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de Compras</h3>
            
            <div className="products-container">
                {groupedProducts.length > 0 ? (
                    groupedProducts.map((product) => {
                        const totalPrice = product.price * product.quantity; // Calcular el precio total
                        return (
                            <div className="product-item" key={product.id}>
                                {product.images.length > 0 && (
                                    <img 
                                        src={product.images[0].imageBase64} 
                                        alt={product.name}
                                        className='produc-image'
                                    />
                                )}     
                                <h4 className="product-name">{product.name} (X
                                    {product.quantity})</h4>
                                <p className="product-price">Precio Unitario: ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                                <p className="product-total-price">Precio Total: ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                               
                                <button className='btn-remove' onClick={() => handlerRemoveCartProduct(product.id)}>
                                    Eliminar
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
            <div className="total-container">
                <span className='total-pagar'>Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
                <button className='btn-clear-all' onClick={handlerCleanCart}>
                    Vaciar Carrito
                </button>
            </div>
            <div>
                <button className='btn-checkout' onClick={handlerCheckout}>
                    Realizar Compra
                </button>
            </div>
        </div>
    );
}

export default Cart;