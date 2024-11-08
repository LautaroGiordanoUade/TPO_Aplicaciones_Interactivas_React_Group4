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
        console.log("Intentando eliminar producto con id:", id);
        
        const updatedProducts = groupedProducts.reduce((acc, product) => {
            console.log("Comparando con producto:", product.id);
            if (product.id === id) {
                console.log("Eliminando producto:", product.id);
                // Si la cantidad es 1, no lo agregamos al acumulador (lo eliminamos)
                if (product.quantity > 1) {
                    console.log("Reduciendo producto:", product.id);
                    // Si la cantidad es mayor que 1, reducimos la cantidad
                    acc.push({ ...product, quantity: product.quantity - 1 });
                }
                // Si la cantidad es 1, simplemente no lo agregamos al acumulador
            } else {
                acc.push(product); // Mantener otros productos
            }
            return acc;
        }, []);
    
        console.log("Los productos nuevos son:", updatedProducts);
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
        console.log("Productos actualizados:", groupedProducts);
       navigate('/checkout', { state: { items: groupedProducts, total: total } });
    
    }; 

    const groupedProducts = products.reduce((acc, product) => {
        const existingProduct = acc.find(item => item.name === product.name);
        if (existingProduct) {
            console.log("los productos nuevos son:",{existingProduct});
            existingProduct.quantity += 1; 
        } else {
            acc.push({ ...product, quantity: 1 }); 
        }
          
        return acc;
    }, []);
    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de Compras</h3>
            
            <div className="products-container">
                {groupedProducts.length > 0 ? (
                    groupedProducts.map((product) => {
                        const totalPrice = product.price * product.quantity; 
                        return (
                            <div className="product-item" key={product.id}>
                                {product.images.length > 0 && (
                                    <img 
                                        src={product.images[0].imageBase64} 
                                        alt={product.name}
                                        className='produc-image'
                                    />
                                )}     
                                <h4 className="product-name">{product.name} (X{product.quantity})</h4>
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


