import React, { useEffect, useState } from 'react';
import { getUser Profile, getUser Transactions } from '../services/userService';
import './User Profile';

const UserProfile = () => {
    const [user, setUser ] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser Profile();
                const userTransactions = await getUser Transactions();
                setUser (userData);
                setTransactions(userTransactions);
            } catch (error) {
                console.error("Error fetching user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="user-profile">
            <h1>Mi Perfil</h1>
            {user && (
                <div className="user-info">
                    <h2>Datos del Usuario</h2>
                    <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}
            <div className="user-transactions">
                <h2>Mis Compras</h2>
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map(transaction => (
                            <li key={transaction.id}>
                                <p><strong>Fecha:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                                <p><strong>Carrito:</strong> {transaction.cartDetails}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No has realizado compras todavía.</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
