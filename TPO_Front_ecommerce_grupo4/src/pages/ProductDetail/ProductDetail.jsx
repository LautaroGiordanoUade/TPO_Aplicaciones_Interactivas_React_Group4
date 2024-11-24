import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById, editProduct, addFavorites, deleteFavorites } from "../../services/productService.js";
import ImageCarousel from "../../components/product/ImageCarousel.jsx";
import "./StyledProductDetail.css";
import placeholderImage from "/public/placeholder.png";
import ModalOnCart from "../../components/Cart/ModalOnCart.jsx";
import {
  checkIfProductExistsInCart,
  updateProductCart,
  createProductCart,
  getProductQuantityInCart,
} from "../../services/cartService.js";
import { useAuth } from "../../hooks/useAuth";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProducto, setModalProduct] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    try {
      product.favorite = !product.favorite;
      if (isFavorite) {
        await deleteFavorites(id);
      } else {
        await addFavorites(id)
      }
      //await editProduct(product);
    } catch (error) {
      product.favorite = !product.favorite;
    } finally {
      setIsFavorite(product.favorite);
    }
  };

  const handleOpenModal = (response) => {
    setModalProduct(response);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handlerInit = async () => {
    try {
      const response = await getProductsById(id);
      console.log(response)
      setProduct(response);
      setIsFavorite(response.favorite);
      //await postViewed();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlerInit();
  }, [id, isFavorite]);

  const createProductObject = (productId, quantity) => {
    return {
      productId,
      quantity,
    };
  };

  const handlerAddToCart = async (product) => {
    try {
      
      const productCart = createProductObject(product.id, 1);
      
     
      const response = await createProductCart(productCart);
      if (response) {
        handleOpenModal(response);
        
      }
    } catch (error) {
      handleOpenModal("Error al agregar el producto al carrito.");
    }
  };

  return (
    <>
      {product ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                {product.images && product.images.length > 0 ? (
                  <ImageCarousel images={product.images} />
                ) : (
                  <img src={placeholderImage} width={300} height={300} />
                )}
              </div>

              <div className="col text-start">
                <div className="row">
                  <div className="col h6">
                    <div className="row h1">{product.name}</div>
                  </div>
                  <div className="col-1 text-end">
                    {user && (
                      <button
                        className="favorite btn btn-link"
                        onClick={handleFavorite}
                      >
                        <i
                          className={
                            isFavorite
                              ? "h2 bi bi-heart-fill"
                              : "h2 bi bi-heart"
                          }
                          aria-hidden="true"
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
                <div className="row h2">${product.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</div>
                <div className="row mt-4">{product.description}</div>
                <div className="row mt-4 align-middle">
                  <div className="col h6">
                    Quedan {product.quantity} unidades
                  </div>
                  <div className="col text-end">
                    <button
                      type="button"
                      className="btn btn-primary bi bi-cart-fill"
                      onClick={() => handlerAddToCart(product)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
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
      <ModalOnCart
        show={showModal}
        handleClose={handleCloseModal}
        product={modalProducto}
      />
    </>
  );
};

export default ProductDetail;
