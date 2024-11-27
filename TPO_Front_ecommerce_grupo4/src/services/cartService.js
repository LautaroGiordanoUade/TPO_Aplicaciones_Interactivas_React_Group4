import apiClient from "./apiClient"

export const getProductsCart = async () => {
    const response = await apiClient.get('cart');
    return response.data    
}

export const deleteProductCart = async (product) => {
  const response =  await apiClient.delete(`cart/remove`,{data:product});
  return response.data;
}


export const deleteAllProductCart = async () => {
  const response = await apiClient.delete('cart/empty');
  return response.data;
}

export const createProductCart = async (product) => {
  
  const response =  await apiClient.post('cart/add', JSON.stringify(product));
  return response.data;
}


export const checkoutCart = async ()=>{
  const response= await apiClient.post('cart/checkout');
  return response.data
}


 
//TODO: cuando la integracion se realice , cambiar para q envie los datos de usuario y con eso ya filtra
export const getPurchaseHistory = async () => {
  try {
    const response = await apiClient.get('cart/purchase-history');
  
    return response.data;
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