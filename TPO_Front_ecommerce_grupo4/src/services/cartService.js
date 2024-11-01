import axios from "axios";

export const getProductsCart = async () => {
    try{
        const response =  await axios.get('/data/db.json');
        return Array.isArray (response.data.products) ? response.data.products: [];
    }catch(error){
        console.error("Error al obtener los datos del producto del carrito ",error);
        return [];
    }
    
}