import React from "react";
import { useEffect, useState } from "react";
import { getFeaturedProducts } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Carousel from "react-bootstrap/Carousel";
import _ from "lodash";

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
      <h4>Productos destacados:</h4>
      {products === null ? (
        <div>
          <div>
          <i className="bi bi-exclamation-circle info-icon-4"></i>
          <div>{error}</div>
        </div>
        </div>
      ) : products.length < 1 ? (
        <div>
          <i className="bi bi-star info-icon-4"></i>
          <div>No hay productos destacados por el momento.</div>
        </div>
      ) : (
        <div className="row">
          <Carousel data-bs-theme="dark">
            {_.chunk(products, 3).map((group, index) => (
              <Carousel.Item key={index} data-bs-theme="light">
                <div className="row">
                  {group.map((product, productIndex) => (
                    <div
                      key={productIndex}
                      className="col-md-4 col-sm-6 col-xs-12"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
