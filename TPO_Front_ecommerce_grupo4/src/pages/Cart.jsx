import React from 'react';
const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
};




const Cart = ({ total, onCleanCart }) => {
    return (
        <>
            <h3>Total:</h3>
            <span className='total-pagar'>${5000}</span>
            <div>
            <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
            </button>
            </div>
        </>
    );
}

export default Cart;