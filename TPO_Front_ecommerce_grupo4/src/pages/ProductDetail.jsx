import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../services/productService";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productHasError, setProductHasError] = useState(false);
    const [productErrorMessage, setProductErrorMessage] = useState("");

    useEffect(() => {
        const init = async () => {
            try {
                const response = await getProductsById(id);
                setProduct(response);
            } catch (error) {
                console.log(error);
                setProductHasError(true);
                setProductErrorMessage('Ocurrió un error.');
            }
        };
        init();
    }, [id]);

    return (<>
        <h1>{product?.name}</h1>
        
        { product?.images.map((image, index) => (
                        <img key={index} src={image.imageBase64} />
                    ))}
    </>);
};

export default ProductDetail;