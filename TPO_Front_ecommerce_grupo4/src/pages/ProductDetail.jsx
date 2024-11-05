import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById } from "../services/productService";
import ImageCarousel from '../components/product/ImageCarousel.jsx';

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

    return (
    <>
        {product ? 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        {product?.images ? <ImageCarousel images={product?.images} /> : null}
                    </div>

                    <div className="col-md-6">
                        <h1>{product?.name}</h1>
                        <h1>{product?.price}</h1>
                        <p>{product?.description}</p>
                        <button type="button" className="btn btn-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </> :
        <>
            <h1>No se encontró el producto</h1>
        </>
        }
    </>);
};

export default ProductDetail;