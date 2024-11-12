import LogoutButton from "../components/Profile/LogoutButton";
import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserPurchases } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; 

const UserProfile = () => {
    const { user } = useAuth();
    const userId = user?.id || user?.userId;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const fetchUserData = async () => {
        try {
            const profileData = await getUserProfile(userId);
            setUserData(profileData);
        } catch (error) {
            setError("Error al obtener los datos del usuario.");
        }
    };

    useEffect(() => {
        if (!userId) return;
        fetchUserData();
    }, [user]);

    const handlerPurchaseHistory = () => {
        if (user) {
            navigate("/purchase-history");
          } else {
            navigate("/userLogin");
          } 
    };

    const handleEditProfile = () => {
        navigate('/edit-profile'); 
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>Mi Perfil</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                <div style={{ marginBottom: '20px' }}>
                    <h2>Datos del Usuario</h2>
                    <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {new Date(userData.dob).toLocaleDateString()}</p>
                    <p><strong>Dirección:</strong> {userData.address}</p>
                    <button 
                        onClick={handleEditProfile} 
                        style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Editar Perfil
                    </button>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <></>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
               Cerrar sesión <LogoutButton />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                Historial carrito de compras<button 
                        className="btn btn-outline-success ms-2" 
                        onClick={handlerPurchaseHistory} 
                        title="Historial carrito de compras">
                            <i className="bi bi-cart-fill" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

export default UserProfile;