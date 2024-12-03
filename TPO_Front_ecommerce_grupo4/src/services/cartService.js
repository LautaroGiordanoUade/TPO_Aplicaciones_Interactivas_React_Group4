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


 
export const getPurchaseHistory = async () => {
    const response = await apiClient.get('cart/purchase-history');
    return response.data;
};
