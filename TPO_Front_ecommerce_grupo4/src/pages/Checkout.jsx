import React, { useEffect,useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import '../components/Cart/StyledCheckout.css';
import ToastMessage from '../components/ToastMessage'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { 
    postPurchaseHistory,
    getProductsCart,
    checkoutCart
    }    
    from '../services/cartService';
import {editProduct,getProductsById,deleteProduct} from "../services/productService.js";




const Checkout = () => {
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };
    const { user } = useAuth();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [loading, setLoading] = useState(false);
    const [bought, setbought] = useState(false);
    const [currentProducts, setCurrentProducts] = useState([]);

    const fetchCurrentProducts = async () => {
        try {
            const products = await getProductsCart();
            console.log("Productos obtenidos: ",products.items) // Obtener todos los productos desde la base de datos
            setCurrentProducts(products.items);
        } catch (error) {
            console.error("Error al obtener productos: ", error);
        }
    };
    useEffect(() => {
        fetchCurrentProducts();
    }, []);
    useEffect(() => {
        console.log("Cantidad de currentProducts: ", currentProducts.length);
        console.log("Productos actuales: ", currentProducts);

    }, [currentProducts]);

    useEffect (()=>{
        console.log("Cargando productos ..");
        fetchCurrentProducts();
    },[]);

    const handlerUpdatedb = async(productCart)=>{
        try{
            const response=await editProduct(productCart);
        }catch(error){
            console.log(error)
        }
    }
    const CheckoutCart= async ()=>{
        try{
            const response=await checkoutCart()
        }catch(error){
            console.log(error)
        }
    }



    const handlePurchase = async () => {
        setLoading(true);
        const minLoadingTime = 2000;//delay para mostrar el loading, solo 2 segundos
        const startTime = Date.now();
    
        const finalizePurchase = (message, variant, isBought) => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
            setTimeout(() => {
                setToastMessage(message);
                setToastVariant(variant);
                setShowToast(true);
                setLoading(false);
                if (isBought) setbought(true);
            }, remainingTime);
        };
    
       /* try {
            await postPurchaseHistory(user.userId || user.id, currentProducts);
            finalizePurchase('Compra realizada con éxito', 'success', true);
            
        } catch (error) {
            console.error(error);
            finalizePurchase('Error al realizar la compra', 'danger', false);
        } finally {

        }*/

   
        try{
            await CheckoutCart();
            finalizePurchase("Compra realizada con exito",'success',true);
        }catch(error){
            console.error(error);
            finalizePurchase('Error al realizar la compra', 'danger', false);
        } finally {}
        
       await CheckoutCart();

        
        
    };
    
    

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            {loading && <LoadingSpinner text="Procesando compra..." />}
            {currentProducts.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="nameProductCheckout">Producto</th>
                                <th className="nameprecioCheckout">Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((cartItem, index) => {
                                const totalPrice = cartItem.product.price * cartItem.quantity; 
                                return (
                                    <tr key={`${index}-${cartItem}`} className="productCheckout-item">
                                        <td>
                                            <div className="productCheckout-name">X { cartItem.quantity } { cartItem.product.name } </div>
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
                    <div>
                    {!bought && <button className='btn-checkout' onClick={handlePurchase}>
                            Comprar
                    </button>}
                    </div>
                </div>

            ) : (
                <p>No hay productos en el carrito. ¿Qué esperás para agregar productos al carrito?</p>
            )}
            <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            />
        </div>
    );
};

export default Checkout;