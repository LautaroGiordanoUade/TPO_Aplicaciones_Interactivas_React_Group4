import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProducts, getProductsByName } from "../services/productService";
import ProductCard from "../components/product/ProductCard/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AllProducts = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      if (search) {
        const response = await getProductsByName(search);
        setProducts(response);
      } else {
        const response = await getProducts();
        setProducts(response);
      }
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
  }, [search]);

  const propsLoading = {
    text: "Cargando productos, por favor espere...",
  };

  return (
    <div className="d-flex align-content-center flex-wrap">
      {loading && <LoadingSpinner {...propsLoading} />}
      {products === null ? (
        <div>
          <div>
            <i className="bi bi-exclamation-circle info-icon-6"></i>
            <div className="h4">{error}</div>
          </div>
        </div>
      ) : products.length < 1 ? (
        <div>
          <div>
            <i className="bi bi-search info-icon-6"></i>
            <div className="h4">No hay productos por el momento.</div>
          </div>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
