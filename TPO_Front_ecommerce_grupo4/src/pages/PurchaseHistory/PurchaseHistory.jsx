import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPurchaseHistory } from '../../services/cartService';
import { Container, Message, SortButton, HistoryTable } from './StyledPurchaseHistory';
import ToastMessage from '../../components/ToastMessage'

const PurchaseHistory = () => {
    const [history, setHistory] = useState([]);
    const { user } = useAuth();
    const [sortedHistory, setSortedHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc"); // Por defecto ordenar descendente
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [loading, setLoading] = useState(false);


    const fetchHistory = async () => {
        try {
            const data = await getPurchaseHistory(user);
            console.log(data);
            setHistory(data);
            setSortedHistory(data); 
        } catch (error) {
            handlerToastMessage('Error al cargar el historial de compras','danger')
        }
    };

    const handlerToastMessage = async (message, variant) => {
        setLoading(true);
        const minLoadingTime = 500; 
        const startTime = Date.now();
    
        
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        
        
        setTimeout(() => {
            setLoading(false);
        }, remainingTime);
    };
    

    useEffect(() => {
        if (user) {
            fetchHistory();
        }
    }, [user]);

    const sortByDate = () => {
        const sorted = [...history].sort((a, b) => {
            const dateA = new Date(a.chechkoutDate);
            const dateB = new Date(b.chechkoutDate);
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
        setSortedHistory(sorted);
        setSortOrder(prevOrder => (prevOrder === "desc" ? "asc" : "desc")); // Cambiar el orden de la próxima vez
    };

    return (
        <Container>
            {!user ? (
                <Message>Por favor, inicia sesión para ver tu historial de compras.</Message>
            ) : (
                <div>
                    <h1>Historial de Compras</h1>
                    <SortButton onClick={sortByDate}>
                        Ordenar por fecha ({sortOrder === "desc" ? "Más reciente primero" : "Más antiguo primero"})
                    </SortButton>
                    {sortedHistory.length > 0 ? (
                        <HistoryTable>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedHistory.map((purchase, index) => {
                                    const totalCompra = purchase.items.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0);
                                    return (
                                        <React.Fragment key={purchase.id}>
                                            {purchase.items.map((item, itemIndex) => (
                                                <tr key={item.id} style={{ marginBottom: '5px' }}>
                                                    {itemIndex === 0 && (
                                                        <td rowSpan={purchase.items.length}>
                                                            {new Date(purchase.chechkoutDate).toLocaleDateString()}
                                                        </td>
                                                    )}
                                                    <td>{item.product.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>${parseFloat(item.price).toFixed(2)}</td>
                                                    <td>${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan={5} className="total-row">
                                                    <strong>Total Compra: </strong>${totalCompra.toFixed(2)}
                                                </td>
                                            </tr>
                                            {/* Fila vacía para crear el espacio entre las compras */}
                                            <tr><td colSpan={5}></td></tr>
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </HistoryTable>
                    ) : (
                        <p>No hay compras registradas.</p>
                    )}
                     <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            />
                </div>
            )}
        </Container>
    );
};

export default PurchaseHistory;