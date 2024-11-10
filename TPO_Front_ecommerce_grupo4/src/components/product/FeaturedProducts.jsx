import React from "react";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FavoriteProducts = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getFeaturedProducts();
      setProducts(response);
    } catch (err) {
      setError(err.response?.data?.message || "No pudimos obtener los productos destacados. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerInit();
  }, []);

  const propsLoading = {
    text:'Cargando destacados, por favor espere...'
  }

  return (
    <div className="container-fluid border border-success rounded m-3 p-3">
      {loading && <LoadingSpinner {...propsLoading} />}
      <h2>Productos destacados:</h2>
      {products === null ? (
        <div>
          {error}
        </div>
      ) : products.length < 1 ? (
        <div>No hay productos destacados por el momento.</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
