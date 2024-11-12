import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getProductsByCategory(id);
      setProducts(response);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "No pudimos obtener los productos. Intenta más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerInit();
  }, [id]);

  const propsLoading = {
    text: "Cargando productos, por favor espere...",
  };

  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner {...propsLoading} />}

      {products === null ? (
        <div>{error}</div>
      ) : products.length < 1 ? (
        <div>
          <i className="bi bi-search info-icon-6"></i>
          <div className="h4">
            No hay productos para la categoría. Prueba otra o{" "}
            <Link to="/products">mira todos los productos.</Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
