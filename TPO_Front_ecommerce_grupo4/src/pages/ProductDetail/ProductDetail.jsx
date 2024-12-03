import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsById, addFavorites, deleteFavorites } from "../../services/productService.js";
import ImageCarousel from "../../components/product/ImageCarousel.jsx";
import "./StyledProductDetail.css";
import placeholderImage from "/public/placeholder.png";
import ModalOnCart from "../../components/Cart/ModalOnCart.jsx";
import {
  createProductCart
} from "../../services/cartService.js";
import { useAuth } from "../../hooks/useAuth";
import { isTokenError } from "../../components/utils/isTokenError.js";
import ToastMessage from '../../components/ToastMessage.jsx'

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { logout } = useAuth();
  const [product, setProduct] = useState(null);
  const[quantityOnCart,setQuantityOnCart]=useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalProducto, setModalProduct] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [loading, setLoading] = useState(false);


  const handleFavorite = async () => {
    try {
      product.favorite = !product.favorite;
      if (isFavorite) {
        await deleteFavorites(id);
      } else {
        await addFavorites(id)
      }
    } catch (error) {
      product.favorite = !product.favorite;
      if (isTokenError(error)) {
        logout();
      }
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
      setProduct(response);
      setIsFavorite(response.favorite);
    } catch (error) {
      console.log(error);
      if (isTokenError(error)) {
        logout();
      }
    }
  };

  useEffect(() => {
    handlerInit();
  }, [id]);

  const createProductObject = (productId, quantity) => {
    return {
      productId,
      quantity,
    };
  };

  const handlerAddToCart = async (product) => {
    setLoading(true);
    const minLoadingTime = 2000;
    const startTime = Date.now();
    const errorMessage = (message, variant) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
        setTimeout(() => {
            setToastMessage(message);
            setToastVariant(variant);
            setShowToast(true);
            setLoading(false);
        }, remainingTime);
    };

    try {
      const productCart = createProductObject(product.id, 1);
      const response = await createProductCart(productCart);
      if (response) {
        handleOpenModal(response);
      }
    } catch (error) {
        errorMessage("Error al agregar el producto al carrito, intentelo mas tarde",'danger')
      
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
      <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            />
    </>
    
  );
};

export default ProductDetail;
