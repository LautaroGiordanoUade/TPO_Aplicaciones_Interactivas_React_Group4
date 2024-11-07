import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById, postViewed } from "../../services/productService.js";
import ImageCarousel from "../../components/product/ImageCarousel.jsx";
import "./StyledProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productHasError, setProductHasError] = useState(false);
  const [productErrorMessage, setProductErrorMessage] = useState("");

  const handlerInit = async () => {
    try {
      const response = await getProductsById(id);
      setProduct(response);
      //await postViewed();
    } catch (error) {
      console.log(error);
      setProductHasError(true);
      setProductErrorMessage("Ocurrió un error.");
    }
  };

  useEffect(() => {
    handlerInit();
  }, [id]);

  return (
    <>
      {product ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                {product.images ? (
                  <ImageCarousel images={product.images} />
                ) : null}
              </div>

              <div
                className="col-md-6 left-aligned"
                style={{ textAlign: "left" }}
              >
                <h1 className="left-aligned">{product.name}</h1>
                <h2>${product.price}</h2>
                <p>{product.description}</p>
                <button type="button" className="btn btn-primary">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid">
            <h1>No se encontró el producto</h1>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;