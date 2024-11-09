import React, { useEffect, useState } from 'react';
import { getUser Profile, getProductsCart } from '../services/userService';
import { useAuth } from '../context/AuthContext'; // Asumiendo que tienes un contexto de autenticación
import './User Profile.css'; // Importa los estilos

const UserProfile = () => {
    const { userId } = useAuth(); // Obtener el ID del usuario autenticado
    const [userData, setUser Data] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const fetchUser Data = async () => {
            try {
                const profileData = await getUser Profile(userId);
                setUser Data(profileData);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        const fetchUser Cart = async () => {
            try {
                const userCart = await getProductsCart();
                setCartProducts(userCart);
            } catch (error) {
                console.error("Error al obtener el carrito del usuario:", error);
            }
        };

        fetchUser Data();
        fetchUser Cart();
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

