import axios from "axios";

export const getProducts = async () => {
    const response =  await axios.get();
    return response.data.results;
}