import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

const FavoriteProducts = () => {
  const { user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getFeaturedProducts();
      setFeatured(response);
    } catch (error) {
      setError(err.response?.data?.message || "No pudimos obtener los productos destacados. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      handlerInit();
    }
  }, []);

  const propsLoading = {
    text:'Cargando destacados, por favor espere...'
  }

  return (
    <div className="container-fluid border border-success rounded m-3 p-3">
      {loading && <LoadingSpinner {...propsLoading} />}
      <h2>Productos destacados:</h2>
      {!featured === undefined ? (
        <div>
          {error}
        </div>
      ) : featured.length < 1 ? (
        <div>No hay productos destacados por el momento.</div>
      ) : (
        <div className="row">
          {featured.map((product) => (
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
