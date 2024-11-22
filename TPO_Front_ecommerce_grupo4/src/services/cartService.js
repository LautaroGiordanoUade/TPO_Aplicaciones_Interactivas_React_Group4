import apiClient from "./apiClient"
import apiClientPublic from "./apiClientPublic";

export const getProductsCart = async () => {
    const response = await apiClient.get('cart');
    return response.data    
}

export const deleteProductCart = async (id) => {
  const response =  await apiClient.delete(`cart/remove/${id}`);
  return response.data;
}


export const deleteAllProductCart = async () => {
  const response = await apiClient.delete('cart/empty');
  return response.data;
}

export const createProductCart = async (id) => {
  const response =  await apiClient.post(`cart/add/${id}`);
  return response.data;
}

export const updateProductCart = async (productCart) => {
  const response =  await apiClient.put(`cart/update`,  JSON.stringify(productCart)); 
  return response.data;
}

export const checkIfProductExistsInCart = async (productId) => {
      const cartProducts = await getProductsCart();
      return cartProducts.some(product => product.id === productId); // Retorna true si existe, false si no
  }
  export const getProductQuantityInCart = async (productCart) => {
    const response = await apiClient.get(`cart/quantity`.JSON.stringify(productCart));   
    return response.data.quantity; 
};
 
//TODO: cuando la integracion se realice , cambiar para q envie los datos de usuario y con eso ya filtra
export const getPurchaseHistory = async (user) => {
  try {
    const response = await apiClient.get('/purchase-history');
    
    // Filtrar las compras de acuerdo al userId
    const filteredHistory = response.data.filter(purchase => purchase.userId === (user.userId|| user.id));
    
    return filteredHistory;
  } catch (error) {
    console.error('Error intentando obtener purchase history: ' + error.message);
  }
};
// VER CON LAUTI

export const postPurchaseHistory = async (userId, items) => {
  try {
    const purchaseData = {
      userId: userId,
      date: new Date().toISOString(),
      products: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const response = await apiClient.post('/purchase-history', purchaseData);
    return response.data;
  } catch (error) {
    console.error('Error intentando comprar productos: ' + error.message);
    throw error;
  }
};
//VER CON LAUTI