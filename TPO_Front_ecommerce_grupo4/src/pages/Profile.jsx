import React, { useEffect, useState } from 'react';
import { getUserProfile, getProductsCart } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import './Profile.css'; // Importa los estilos

const UserProfile = () => {
    const { user } = useAuth(); // Obtener el objeto de usuario
    const userId = user?.id; // Me aseguro que user tenga un id
    const [userData, setUserData] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (!userId) return; // No hacer nada si no hay userId

        const fetchUserData = async () => {
            try {
                const profileData = await getUserProfile(userId);
                setUserData(profileData);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        const fetchUserCart = async () => {
            try {
                const userCart = await getProductsCart(userId); // Paso userId 
                setCartProducts(userCart);
            } catch (error) {
                console.error("Error al obtener el carrito del usuario:", error);
            }
        };

        fetchUserData();
        fetchUserCart();
    }, [userId]);

    return (
        <div className="user-profile-container">
            <h1>Mi Perfil</h1>
            {userData ? (
                <div className="user-info">
                    <h2>Datos del Usuario</h2>
                    <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}

            <h2>Mi Carrito</h2>
            {cartProducts.length > 0 ? (
                <ul>
                    {cartProducts.map((product) => (
                        <li key={product.id}>
                            <p><strong>Producto:</strong> {product.name}</p>
                            <p><strong>Cantidad:</strong> {product.quantity}</p>
                            <p><strong>Precio Unitario:</strong> ${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                            <p><strong>Precio Total:</strong> ${(product.price * product.quantity).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes productos en tu carrito.</p>
            )}
        </div>
    );
};

export default UserProfile;

