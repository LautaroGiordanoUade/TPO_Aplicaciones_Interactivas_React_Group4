import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById, postViewed } from "../../services/productService.js";
import ImageCarousel from "../../components/product/ImageCarousel.jsx";
import "./StyledProductDetail.css";
import{
  checkIfProductExistsInCart,
  updateProductCart,
  createProductCart,
  getProductQuantityInCart
  }
  from "../../services/cartService.js";

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

  const handlerAddToCart = async(product)=>{
    try {
      
      const exists = await checkIfProductExistsInCart(product.id);
      console.log(exists);
      
      if (exists) {
          
          const currentQuantity = await getProductQuantityInCart(product.id); 
          console.log(currentQuantity)
          
          product.quantityOnCart = currentQuantity || 0; 
          product.quantityOnCart += 1; 
          
          
          await updateProductCart(product);
          console.log(`Producto actualizado en el carrito: ${product.id}, nueva cantidad: ${product.quantityOnCart}`);
      } else {
          
          product.quantityOnCart = 1;
          await createProductCart(product); // Asegúrate de que esta función maneje el objeto correctamente
          console.log(`Producto agregado al carrito: ${product.id}`);
      }
  } catch (error) {
      console.log("Error al agregar el producto al carrito:", error);
  }
    
  }

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
                className="col-md-8 left-aligned"
                style={{ textAlign: "left" }}
              >
                <h1 className="left-aligned">{product.name}</h1>
                <h2>${product.price}</h2>
                <p>{product.description}</p>
                <button type="button" className="btn btn-primary" onClick={() => handlerAddToCart(product)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <i className="bi bi-search info-icon-6"></i>
            <div className="h4">No se encontró el producto</div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetail;
