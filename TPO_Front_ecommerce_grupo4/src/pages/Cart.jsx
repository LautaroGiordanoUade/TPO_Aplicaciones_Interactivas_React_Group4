import React,{useEffect, useState} from 'react';
import '../components/Cart.css'
import productsData from '../productsCart.json' 

const Cart = () => {
    const [products, setProducts] = useState(productsData); 
    const[total,setTotal]=useState(0)
    const totalFinal=total.toFixed(2);

    const handleRemoveProduct = (id) => {
        
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        console.log(updatedProducts); 
    };
    useEffect(()=>{
        const newTotal = products.reduce((acc, product) => acc + product.price, 0); 
        setTotal(newTotal);
    },[products]);

    const handleCleanCart = () => {
        setProducts([]); // Vacía el carrito
    };

    
    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de Compras</h3>
            
            <div className="products-container">
                {products.map((product) => (
                    <div className="product-item" key={product.id}>
                        <h4 className="product-name">{product.name}</h4>
                        <p className="product-price">Precio: ${product.price}</p>
                        <button className='btn-remove' onClick={() => handleRemoveProduct(product.id)}>
                            Eliminar
                        </button>
                    </div>
                ))}
                {products.length === 0 && <p>No hay productos en el carrito.</p>} 
            </div>
            <div className="total-container">
            <span className='total-pagar'>Total: ${totalFinal}</span>
                <button className='btn-clear-all' onClick={handleCleanCart}>
                    Vaciar Carrito
                </button>
            </div>
            
        </div>
    );
}

export default Cart;