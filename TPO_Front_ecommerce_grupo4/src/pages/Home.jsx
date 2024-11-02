import { useEffect, useState } from "react"
import { getFeaturedProducts } from "../services/productService";
import { Link } from "react-router-dom";

const Home = () => {
    const [featuredProductList, setFeaturedProductList] = useState([]);
    const [featuredProductHasError, setFeaturedProductHasError] = useState(false);
    const [featuredProductErrorMessage, setFeaturedProductErrorMessage] = useState("");

    useEffect(() => {
        const init = async () => {
            try {
                const response = await getFeaturedProducts();
                setFeaturedProductList(response);
            } catch (error) {
                setFeaturedProductHasError(true);
                setFeaturedProductErrorMessage('Ocurrió un error.');
            }
        };
        init();
    }, []);

    return (
        <>
            <h1>BIENVENIDO</h1>
            <h2>Productos destacados:</h2>
            {featuredProductHasError ? (
                <h3>{ featuredProductErrorMessage }</h3>
            ) : (
                <div className="list-group">
                    { featuredProductList.map((product, index) => (
                        <Link key={index} to={"product/"+product.id} className="list-group-item list-group-item-action">
                            <div>
                                {product.name}
                                <img key={index} src={product.images[0]?.imageBase64} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default Home