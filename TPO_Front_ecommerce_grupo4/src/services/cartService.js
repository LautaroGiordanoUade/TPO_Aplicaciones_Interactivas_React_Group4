import axios from "axios";
import apiClient from "./apiClient"

export const getProductsCart = async () => {
    const response = await apiClient.get('cart-Products');
    return response.data
       
}