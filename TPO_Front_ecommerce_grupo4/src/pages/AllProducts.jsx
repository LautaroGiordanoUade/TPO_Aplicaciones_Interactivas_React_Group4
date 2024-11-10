import React from "react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AllProducts = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlerInit = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response);
    } catch (err) {
      setError(err.response?.data?.message || "No pudimos obtener los productos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerInit();
  }, []);

  const propsLoading = {
    text:'Cargando productos, por favor espere...'
  }

  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner {...propsLoading} />}

      {products === null ? (
        <div>
          {error}
        </div>
      ) : products.length < 1 ? (
        <div>No hay productos por el momento.</div>
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

export default AllProducts;
