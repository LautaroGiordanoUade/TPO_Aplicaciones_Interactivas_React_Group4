import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPurchaseHistory } from '../../services/cartService';
import { Container, Message, SortButton, HistoryTable } from './StyledPurchaseHistory';

const PurchaseHistory = () => {
    const [history, setHistory] = useState([]);
    const { user } = useAuth();
    const [sortedHistory, setSortedHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc"); // Por defecto ordenar descendente
  
    const fetchHistory = async () => {
      try {
        const data = await getPurchaseHistory(user);
        setHistory(data);
        setSortedHistory(data); // Inicializar el historial con los datos sin ordenar
      } catch (error) {
        console.error('No se pudo cargar el historial de compras:', error);
      }
    };
  
    useEffect(() => {
      if (user) {
        fetchHistory();
      }
    }, [user]);
  
    const sortByDate = () => {
      const sorted = [...history].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
      setSortedHistory(sorted);
      setSortOrder(sortOrder === "desc" ? "asc" : "desc"); // Cambiar el orden de la próxima vez
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
              {sortedHistory?.length > 0 ? (
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
                      const totalCompra = purchase.products.reduce((total, product) => total + (product.price * product.quantity), 0);
                      return (
                        <React.Fragment key={index}>
                          {purchase.products.map((product, productIndex) => (
                            <tr key={product.id}>
                              {productIndex === 0 && (
                                <td rowSpan={purchase.products.length}>
                                  {new Date(purchase.date).toLocaleDateString()}
                                </td>
                              )}
                              <td>{product.name}</td>
                              <td>{product.quantity}</td>
                              <td>${product.price}</td>
                              <td>${product.price * product.quantity}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={5} className="total-row">
                              <strong>Total Compra: </strong>${totalCompra}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </HistoryTable>
              ) : (
                <p>No hay compras registradas.</p>
              )}
            </div>
          )}
        </Container>
      );
    };
  export default PurchaseHistory;