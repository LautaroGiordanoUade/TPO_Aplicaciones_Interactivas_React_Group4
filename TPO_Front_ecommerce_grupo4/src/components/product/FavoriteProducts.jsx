import React from "react";
import { useEffect, useState } from "react";
import { getFavorites } from "../../services/productService";
import ProductCard from "./ProductCard";

const FavoriteProducts = () => {
  const [favoriteProductList, setFavoriteProductList] = useState([]);
  const [favoriteProductHasError, setFavoriteProductHasError] = useState(false);
  const [favoriteProductErrorMessage, setFvovoriteProductErrorMessage] =
    useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getFavorites();
        setFavoriteProductList(response);
      } catch (error) {setFavoriteProductHasError
        setFeaturedProductHasError(true);
        setFvovoriteProductErrorMessage("Ocurrió un error.");
      }
    };
    init();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Favoritos:</h2>
      <div className="row">
        {favoriteProductList.map((product) => (
            <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
              <ProductCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
