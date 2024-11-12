import LogoutButton from "../components/Profile/LogoutButton";
import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserPurchases } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();
    const userId = user?.id;
    const [userData, setUserData] = useState(null);
    const [userPurchases, setUserPurchases] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const profileData = await getUserProfile(userId);
                setUserData(profileData);
            } catch (error) {
                setError("Error al obtener los datos del usuario.");
            }
        };

        const fetchUserPurchases = async () => {
            try {
                const purchases = await getUserPurchases(userId);
                setUserPurchases(purchases);
            } catch (error) {
                setError("Error al obtener las compras del usuario.");
            }
        };

        fetchUserData();
        fetchUserPurchases();
    }, [userId]);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>Mi Perfil</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Datos del Usuario</h2>
                    <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <h2>Mis Compras</h2>
            {userPurchases.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {userPurchases.map((purchase) => (
                        <li key={purchase.id} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
                            <p><strong>Fecha de Compra:</strong> {new Date(purchase.date).toLocaleDateString()}</p>
                            <p><strong>Productos Comprados:</strong></p>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {purchase.products.map((product) => (
                                    <li key={product.id}>
                                        {product.name} - Cantidad: {product.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No has realizado ninguna compra.</p>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default UserProfile;