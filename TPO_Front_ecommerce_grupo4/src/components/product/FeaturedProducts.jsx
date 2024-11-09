import React from "react";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";

const FeaturedProducts = () => {
  const [featuredProductList, setFeaturedProductList] = useState([]);
  const [featuredProductHasError, setFeaturedProductHasError] = useState(false);
  const [featuredProductErrorMessage, setFeaturedProductErrorMessage] =
    useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getFeaturedProducts();
        setFeaturedProductList(response);
      } catch (error) {
        setFeaturedProductHasError(true);
        setFeaturedProductErrorMessage("Ocurrió un error.");
      }
    };
    init();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Productos destacados:</h2>
      <div className="row">
        {featuredProductList.map((product) => (
            <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
              <ProductCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
