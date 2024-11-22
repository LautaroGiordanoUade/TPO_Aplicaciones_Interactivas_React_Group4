import React, { useEffect, useState } from 'react';
import '../components/Cart/StyledCart.css';
import { getProductsCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import ModalCart from '../components/Cart/ModalCart'; 
import{
deleteProductCart,
updateProductCart
}
from "../services/cartService.js";
import {getProductsById} from "../services/productService.js";

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const[quantityProduct,setQuantityProduct]=useState(0);
    const [showModal, setShowModal] = useState(false);



    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setOutOfStockItems([]); 
        setQuantityProduct(0);
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
           await handlerfetchCartProducts();
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

    const handlerRemoveCartdb = async (id)=>{
        try {
            const response = await deleteProductCart(id);
          } catch (error) {
            console.log(error);
          }
        }
    


    const handlerUpdatedb = async(productCart)=>{
        try{
            const response=await updateProductCart(productCart);
        }catch(error){
            console.log(error)
        }
    }



    const handlerRemoveCartProduct = (id) => {
        const updatedProducts = products.reduce((acc, product) => {
            
            if (product.id === id) {
                if (product.quantity > 1) {
                    acc.push({ ...product, quantity: product.quantity - 1 });
                    handlerUpdatedb(product)
                    return acc;
                }
                
            } else {
                acc.push(product);
            }
            return acc;
        }, []);
    
        if (updatedProducts.length < products.length) {
            handlerRemoveCartdb(id);
        }
        setProducts(updatedProducts);
    };


    
    useEffect(() => {
        const newTotal = products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);
        setTotal(newTotal);
    }, [products]);


    const handlerCleanCart = () => {
        for (const product of products){
            handlerRemoveCartdb(product.id)
        }
        setProducts([]); 
        
    };
    


    const  handlerCheckout = async () => {
        for (const product of products) {
            const originalItem = await getProductsById(product.id); 
            if (product.quantity > originalItem.quantity) { 
                outOfStockItems.push(product);
                quantityProduct.push(originalItem.quantity);
            }
            
        }
    
        if (outOfStockItems.length > 0) {
            setOutOfStockItems(outOfStockItems);
            setQuantityProduct(quantityProduct);
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
                                {product?.images?.length > 0 && (
                                    <img 
                                        src={product.images[0].imageBase64} width={300} 
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
                    Realizar Checkout
                </button>
            </div>
            <ModalCart 
            showModal={showModal} 
            handleClose={handleCloseModal} 
            items={outOfStockItems}
            quantityOfProduct={quantityProduct} 
        />
        </div>
    );
}

export default Cart;


