import axios from "axios";
import apiClient from "./apiClient"

export const getProductsCart = async () => {
    const response = await apiClient.get('cart-Products');
    return response.data    
}

export const deleteProductCart = async (id) => {
  const response =  await apiClient.delete(`cart-Products/${id}`);
  return response.data;
}


export const deleteAllProductCart = async () => {
  const response = await apiClient.delete('cart-Products');
  console.log("Todos los productos del carrito han sido eliminados:", response);
  return response.data;
}

export const createProductCart = async (product) => {
  const response =  await apiClient.post('cart-Products', product);
  return response.data;
}

export const updateProductCart = async (productCart) => {
  const response =  await apiClient.put(`cart-Products/${productCart.id}`,  JSON.stringify(productCart));
  return response.data;
}

export const checkIfProductExistsInCart = async (productId) => {
      const cartProducts = await getProductsCart();
      return cartProducts.some(product => product.id === productId); // Retorna true si existe, false si no
  }
  export const getProductQuantityInCart = async (id) => {
    const response = await apiClient.get(`cart-Products/${id}`);
    return response.data.quantityOnCart; // Asegúrate de que el formato de la respuesta sea correcto
};
 
//TODO: cuando la integracion se realice , cambiar para q envie los datos de usuario y con eso ya filtra
export const getPurchaseHistory = async (user) => {
  try {
    const response = await apiClient.get('/purchase-history');
    
    // Filtrar las compras de acuerdo al userId
    const filteredHistory = response.data.filter(purchase => purchase.userId === user.userId);
    
    return filteredHistory;
  } catch (error) {
    console.error('Error intentando obtener purchase history: ' + error.message);
  }
};


export const postPurchaseHistory = async (userId, items) => {
  try {
    const purchaseData = {
      userId: userId,
      date: new Date().toISOString(),
      products: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantityOnCart,
      })),
    };

    const response = await apiClient.post('/purchase-history', purchaseData);
    return response.data;
  } catch (error) {
    console.error('Error intentando comprar productos: ' + error.message);
    throw error;
  }
};