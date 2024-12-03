import LogoutButton from "../components/Profile/LogoutButton";
import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; 

const UserProfile = () => {
    const { user } = useAuth();
    const userId = user?.id || user?.userId;
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false); // Para alternar entre vista y edición
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const fetchUserData = async () => {
        try {
            const profileData = await getUserProfile(userId);
            // Convertir fecha de nacimiento al formato compatible con el input date
            if (profileData.birthDate) {
                profileData.birthDate = new Date(profileData.birthDate).toISOString().split("T")[0];
            }
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
        setEditing(true); // Activar modo edición
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(userData); // Enviar datos al backend
            setEditing(false); // Salir del modo edición
        } catch (error) {
            setError("Error al actualizar los datos del usuario.");
        }
    };

    const handleCancelEdit = () => {
        setEditing(false); // Cancelar edición
        fetchUserData(); // Recargar datos originales
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value }); // Actualizar datos en tiempo real
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h1 style={{ textAlign: 'center' }}>Mi Perfil</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData ? (
                editing ? (
                    <form onSubmit={handleSaveProfile}>
                        <h2>Editar Perfil</h2>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <strong>Nombre:</strong>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName || ""}
                                    onChange={handleInputChange}
                                    style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <strong>Apellido:</strong>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName || ""}
                                    onChange={handleInputChange}
                                    style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <strong>Email:</strong>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={userData.email || ""}
                                    onChange={handleInputChange}
                                    style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>
                                <strong>Fecha de Nacimiento:</strong>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={userData?.birthDate || ""}
                                    onChange={handleInputChange}
                                    style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Cancelar
                        </button>
                    </form>
                ) : (
                    <div style={{ marginBottom: '20px' }}>
                        <h2>Datos del Usuario</h2>
                        <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {new Date(userData.birthDate)?.toISOString()?.split('T')[0].split('-')?.reverse()?.join('/')}</p>
                        <button 
                            onClick={handleEditProfile} 
                            style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
                        >
                            Editar Perfil
                        </button>
                    </div>
                )
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
               Cerrar sesión <LogoutButton />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                Historial carrito de compras
                <button 
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