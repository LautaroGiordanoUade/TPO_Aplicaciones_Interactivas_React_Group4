import React, { useEffect, useState } from 'react';
import '../components/Cart/StyledCart.css';
import { deleteAllProductCart, getProductsCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import ModalCart from '../components/Cart/ModalCart'; 
import{
deleteProductCart
}
from "../services/cartService.js";

const Cart = () => {
    const [products, setProducts] = useState([]); 
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const [showModal, setShowModal] = useState(false);



    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setOutOfStockItems([]); 
    };

    useEffect(() => {
        const fetchCartProducts = async () => {
           await handlerfetchCartProducts();
        };
        fetchCartProducts();
    }, [products]);
    

    const handlerfetchCartProducts = async () => {
        try {
            const initialCartProducts = await getProductsCart(); //revisar tema imagen
            setProducts(initialCartProducts.items);
            
        } catch (error) {
            console.log('Error al cargar los productos del carrito:', error);
            setcartErrorMessage(error.message || 'Ocurrió un error.');
        }
    };

    useEffect(() => {
        handlerfetchCartProducts();
    }, []);

    const handlerRemoveCartdb = async (productCart)=>{
        try {
            const response = await deleteProductCart(productCart);
            console.log("Producto Eliminado:", response)
          } catch (error) {
            console.log(error);
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
            console.log(productRemoveId)
            const productCart= createProductRemove(productRemoveId,1);
            handlerRemoveCartdb(productCart);
        }catch (error) {
            handleOpenModal("Error al borrar el producto del carrito.");
          }
    };


    
    useEffect(() => {
        const newTotal = products.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0);
        setTotal(newTotal);
    }, [products]);


    const handlerCleanCart = async () => {
        await deleteAllProductCart();
        setProducts([]); 
        
    };
    


    const handlerCheckout = async () => {
        for (const product of products) {
            if (product.quantity > product.product.quantity) {
                console.log("Aca andamo el producto es: ",product)
                outOfStockItems.push(product);

            }
            
        }
    
        if (outOfStockItems.length > 0) {
            console.log(outOfStockItems)
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
        </div>
    );
}

export default Cart;


