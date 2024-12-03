import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getViewed } from "../../services/productService";
import ProductCard from "./ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../hooks/useAuth";
import Carousel from "react-bootstrap/Carousel";
import _ from "lodash";

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
      <h4>Últimos productos vistos:</h4>
      {!user ? (
        <div>
          <i className="bi bi-eye info-icon-4"></i>
          <div>
            <Link to="/userLogin">Inicia sesión</Link> para ver tus últimos
            productos vistos
          </div>
        </div>
      ) : products === null ? (
        <div>
          <div>
            <i className="bi bi-exclamation-circle info-icon-4"></i>
            <div>{error}</div>
          </div>
        </div>
      ) : products.length < 1 ? (
        <div>
          <i className="bi bi-eye info-icon-4"></i>
          <div>Aquí mostraremos los últimos productos que visitaste.</div>
        </div>
      ) : (
        <div className="row">
          {products.length < 4 ? (
            products.map((product) => (
              <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
};

export default ViewedProducts;
