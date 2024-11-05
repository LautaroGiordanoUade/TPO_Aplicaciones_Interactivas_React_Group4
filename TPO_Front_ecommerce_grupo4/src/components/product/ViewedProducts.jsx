import React from "react";
import { useEffect, useState } from "react";
import { getViewed } from "../../services/productService";
import ProductCard from "./ProductCard";

const ViewedProducts = () => {
  const [viewedProductList, setViewedProductList] = useState([]);
  const [viewedProductHasError, setViewedProductHasError] = useState(false);
  const [viewedProductErrorMessage, setViewedProductErrorMessage] =
    useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getViewed();
        setViewedProductList(response);
      } catch (error) {
        setViewedProductHasError(true);
        setViewedProductErrorMessage("Ocurrió un error.");
      }
    };
    init();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Ultimos vistos:</h2>
      <div className="row">
        {viewedProductList.map((product) => (
            <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
              <ProductCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ViewedProducts;
