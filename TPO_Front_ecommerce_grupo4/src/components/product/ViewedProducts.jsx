import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getViewed } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";

const ViewedProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getViewed();
      setProducts(response);
    } catch (err) {
      console.log(err);
      console.log(products);
      setError(
        err.response?.data?.message ||
          "No pudimos obtener los últimos productos vistos. Intenta más tarde."
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
    text: "Cargando últimos productos vistos, por favor espere...",
  };

  return (
    <div className="container-fluid border border-success rounded m-3 p-3">
      {loading && <LoadingSpinner {...propsLoading} />}
      <h2>Últimos productos vistos:</h2>
      {!user ? (
        <div>
          <Link to="/userLogin">Inicia sesión</Link> para ver tus últimos productos vistos
        </div>
      ) : products === null ? (
        <div>{error}</div>
      ) : products.length < 1 ? (
        <div>Aquí mostraremos los últimos productos que visitaste.</div>
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

export default ViewedProducts;
