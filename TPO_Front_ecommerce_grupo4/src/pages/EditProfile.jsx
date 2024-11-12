import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/profileService';
import { useAuth } from '../hooks/useAuth';

const EditProfile = () => {
    const { user } = useAuth();
    const userId = user?.id;
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const profileData = await getUserProfile(userId);
                setUserData(profileData);
            } catch (error) {
                setError("Error al obtener los datos del usuario.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateUserProfile(userId, userData);
            alert("Perfil actualizado con éxito");
        } catch (error) {
            setError("Error al actualizar el perfil.");
        }
    };

    if (isLoading) return <p>Cargando datos del usuario...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1>Editar Perfil</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Apellido:
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Actualizar Perfil
                </button>
            </form>
        </div>
    );
};

export default EditProfile;