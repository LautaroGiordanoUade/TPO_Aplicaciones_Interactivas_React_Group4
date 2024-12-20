import React, { useEffect, useState } from 'react';
import '../components/Cart/StyledCart.css';
import { deleteAllProductCart, getProductsCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../components/ToastMessage';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ModalCart from '../components/Cart/ModalCart'; 
import{
deleteProductCart
}
from "../services/cartService.js";
import { isTokenError } from '../components//utils/isTokenError.js';

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [loading, setLoading] = useState(false);



    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setOutOfStockItems([]); 
    };

    const handlerToastMessage = async (message, variant) => {
        setLoading(true);
        const minLoadingTime = 500; 
        const startTime = Date.now();
    
        
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        
        setTimeout(() => {
            setLoading(false);
        }, remainingTime);
    };

    const handlerfetchCartProducts = async () => {
        try {
            const initialCartProducts = await getProductsCart();
            setProducts(initialCartProducts.items);
        } catch (error) {
            handlerToastMessage('Error al cargar los productos del carrito','danger') 
        }
    };

    useEffect(() => {
        handlerfetchCartProducts();
    }, []);

    const handlerRemoveCartdb = async (productCart)=>{
        try {
            const response = await deleteProductCart(productCart);
            if(response){
                const initialCartProducts = await getProductsCart(); 
                setProducts(initialCartProducts.items);
            }
          } catch (error) {
            handlerToastMessage('Error al remover el producto del carrito','danger')
          }
        }

    
    


    const createProductRemove = (productId, quantity) => {
        return {
          productId,
          quantity,
        };
      };

    const handlerRemoveCartProduct = (productRemoveId) => {
        try{
            const productCart= createProductRemove(productRemoveId,1);
            handlerRemoveCartdb(productCart);
        }catch (error) {
            handlerToastMessage('Error al remover el producto del carrito','danger')
          }
    };


    
    useEffect(() => {
        const newTotal = products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);
        setTotal(newTotal);
    }, [products]);


    const handlerCleanCart = async () => {
        try{
            await deleteAllProductCart();
            setProducts([]);
        }catch (error) {
            handlerToastMessage('Error al vaciar el carrito','danger')
          }
         
        
    };
    


    const handlerCheckout = async () => {
        for (const product of products) {
            if (product.quantity > product.product.quantity) {
                outOfStockItems.push(product);
            }
            
        }
    
        if (outOfStockItems.length > 0) {
            setOutOfStockItems(outOfStockItems);
            handleOpenModal()
            return;
        }

        navigate('/checkout', { state: { items: products, total: total } });
    };
  
    return (
        <div className="cart-container">
            <h3 className="cart-title">Carrito de Compras</h3>
            
            <div className="products-container">
                {products?.length > 0 ? (
                    products?.map((product) => {
                        const totalPrice = product.price * product.quantity; 
                        return (
                            <div className="product-item" key={product.id}>
                                {product?.product.images?.length > 0 && (
                                    <img 
                                        src={product.product.images[0].imageBase64} width={300} 
                                        alt={product.name}
                                        className='produc-image'
                                    />
                                )}     
                                <h4 className="product-name">{product.product.name} (X{product.quantity})</h4>
                                <p className="product-price">Precio Unitario: ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                                <p className="product-total-price">Precio Total: ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                               
                                <button className='btn-remove' onClick={() => handlerRemoveCartProduct(product.product.id)}>
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
                    Realizar Checkout
                </button>
            </div>
            <ModalCart 
            showModal={showModal} 
            handleClose={handleCloseModal} 
            items={outOfStockItems}
        />
        <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            />
        </div>
    );
}

export default Cart;


