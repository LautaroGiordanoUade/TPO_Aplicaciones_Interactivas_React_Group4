import React from "react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard/ProductCard";


const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [productHasError, setProductHasError] = useState(false);
  const [productErrorMessage, setProductErrorMessage] =
    useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getProducts();
        setProductList(response);
      } catch (error) {
        setProductHasError(true);
        setProductErrorMessage("Ocurrió un error.");
      }
    };
    init();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {productList.map((product) => (
            <div className="col-md-3 col-sm-6 col-xs-12" key={product.id}>
              <ProductCard product={product} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
