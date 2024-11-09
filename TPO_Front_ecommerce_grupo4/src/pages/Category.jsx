import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "../components/product/ProductCard/ProductCard";

const Category = () => {
  const { id } = useParams();
  const [productList, setProductList] = useState([]);
  const [productHasError, setProductHasError] = useState(false);
  const [productErrorMessage, setProductErrorMessage] =
    useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getProductsByCategory(id);
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

export default Category;
