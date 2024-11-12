import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

const FavoriteProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getFavorites();
      setProducts(response);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "No pudimos obtener tus productos favoritos. Intenta más tarde."
      );
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
    text: "Cargando favoritos, por favor espere...",
  };

  return (
    <div className="container-fluid border border-success rounded m-3 p-3">
      {loading && <LoadingSpinner {...propsLoading} />}
      <h4>Favoritos:</h4>
      {!user ? (
        <div>
        <i className="bi bi-box2-heart info-icon-4"></i>
        <div>
          <Link to="/userLogin">Inicia sesión</Link> para ver tus productos
          favoritos
        </div>
      </div>
      ) : products === null ? (
        <div>
          <i className="bi bi-exclamation-circle info-icon-4"></i>
          <div >{error}</div>
        </div>
      ) : products.length < 1 ? (
        <div>
          <i className="bi bi-box2-heart info-icon-4"></i>
          <div>Agrega productos a favoritos para verlos aquí.</div>
        </div>
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
